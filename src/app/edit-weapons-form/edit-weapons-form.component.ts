import {
  COMMA,
  ENTER,
} from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  MatChipList,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';

import { getVariantName } from 'src/utilities/object-helpers';
import { compareReferencesByVariantName } from 'src/utilities/sort';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-edit-weapons-form',
  templateUrl: './edit-weapons-form.component.html',
  styleUrls: ['./edit-weapons-form.component.scss']
})
export class EditWeaponsFormComponent implements OnInit {

  @Input() data: {
    limited?: {
      onePerModelCount: number,
      options: {
        reference: Weapon,
      }[],
    },
    options: {
      enabled: boolean,
      reference: Weapon,
    }[],
  };
  @Input() set setOptionsList(optionsList: Weapon[]) {
    this.optionsList = optionsList;

    this.filteredOptionsList = this.chipFormControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        if (value && typeof value === 'string') {
          return this.filterOptions(value);
        } else {
          return this.filterOptions('');
        }
      }),
    );
  }

  @ViewChild(MatChipList, { static: false }) chipList: MatChipList;
  @ViewChild(MatAutocomplete, { static: false }) chipListAuto: MatAutocomplete;
  @ViewChild('chipListInput', { static: false }) chipListInput: ElementRef<HTMLInputElement>;

  readonly separatorKeysCodes: number[] = [
    COMMA,
    ENTER,
  ];

  chipFormControl: FormControl;

  filteredOptionsList: Observable<{
    index: number,
    value: string,
  }[]>;
  optionsList: Weapon[];

  constructor() {
    this.data = { options: [] };
    this.chipFormControl = new FormControl();
  }

  ngOnInit() {
  }

  blurInput = () => {
    if (!this.chipListAuto.isOpen) {
      this.clearInput();
    }
  }

  chipSelectionChange = (event: MatChipSelectionChange, enabled: boolean) => {
    event.source.selected = enabled;
  }

  clearInput = () => {
    if (this.chipFormControl.value !== null || this.chipListInput.nativeElement.value !== '') {
      console.log('cleared');
      this.chipFormControl.setValue(null);
      this.chipListInput.nativeElement.value = '';
    }
  }

  clickChip = (index: number) => {
    const enabled = this.data.options[index].enabled;

    if (!enabled) {
      this.data.options.filter(value => value.enabled).forEach(value => {
        value.enabled = false;
      });
    }

    this.data.options[index].enabled = !enabled;
  }

  filterOptions = (value: string) => {
    return this.optionsList.map((option, index) => ({
      index,
      value: getVariantName(option),
    })).filter(option => {
      if (!this.chipList) {
        return true;
      }

      return (
        option.value.toLowerCase().indexOf(value.toLowerCase()) > -1 &&
        !this.data.options.map(o => getVariantName(o.reference)).includes(option.value)
      );
    });
  }

  getEnabledName = () => {
    const enabledOption = this.data.options.find(value => value.enabled);

    if (enabledOption) {
      return getVariantName(enabledOption.reference);
    } else {
      return 'None';
    }
  }

  getVariantNameWrapper = (reference: {
    name: string,
    variant?: string,
  }) => getVariantName(reference)

  optionSelected = (event: MatAutocompleteSelectedEvent) => {
    this.data.options.push({
      enabled: false,
      reference: this.optionsList[event.option.value],
    });
    this.data.options.sort(compareReferencesByVariantName);
  }

  removeChip = (index: number) => {
    this.data.options.splice(index, 1);
    this.clearInput();
  }

}

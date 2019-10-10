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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  MatChipList,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';

import { VariantName } from 'src/interfaces/models';
import { getVariantName } from 'src/utilities/object-helpers';
import { compareReferencesByVariantName } from 'src/utilities/sort';
import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-option-selection',
  templateUrl: './option-selection.component.html',
  styleUrls: ['./option-selection.component.css']
})
export class OptionSelectionComponent implements OnInit {

  @Input() set init(value: {
    enabled: boolean,
    reference: Biomorph | Weapon,
  }[]) {
    Object.assign(this.selectedOptions, value);

    this.selectedOptions.sort(compareReferencesByVariantName);
  }
  @Input() set setOptionsList(optionsList: (Biomorph | Weapon)[]) {
    this.optionsList = optionsList;

    this.filteredOptions = this.chipFormControl.valueChanges.pipe(
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

  @ViewChild('chipList', { static: false }) chipList: MatChipList;
  @ViewChild('chipListInput', { static: false }) chipListInput: ElementRef<HTMLInputElement>;

  readonly separatorKeysCodes: number[] = [
    COMMA,
    ENTER,
  ];

  chipFormControl: FormControl;
  filteredOptions: Observable<{
    index: number,
    value: string,
  }[]>;
  optionsList: (Biomorph | Weapon)[];
  selectedOptions: {
    enabled: boolean,
    reference: Biomorph | Weapon,
  }[];

  constructor() {
    this.chipFormControl = new FormControl();
    this.optionsList = [];
    this.selectedOptions = [];
  }

  ngOnInit() { }

  clearInput = () => {
    this.chipListInput.nativeElement.value = '';
  }

  clickChip = (index: number) => {
    if (this.selectedOptions[index].enabled) {
      this.selectedOptions[index].enabled = false;
    } else {
      this.selectedOptions.filter(value => value.enabled).forEach(value => {
        value.enabled = false;
      });
      this.selectedOptions[index].enabled = true;
    }
  }

  filterOptions = (value: string) => {
    const filterValue = value.toLowerCase();

    return this.optionsList.map((option, index) => ({
      index,
      value: getVariantName(option),
    })).filter(option => {
      if (!this.chipList) {
        return true;
      }

      return (
        option.value.toLowerCase().indexOf(filterValue) > -1 &&
        !this.selectedOptions.map(opt => getVariantName(opt.reference)).includes(option.value)
      );
    });
  }

  getEnabledName = () => {
    const enabledOption = this.selectedOptions.find((value) => value.enabled);

    if (enabledOption) {
      return getVariantName(enabledOption.reference);
    } else {
      return 'None';
    }
  }

  getVariantNameWrapper = (value: VariantName) => getVariantName(value);

  optionSelected = (event: MatAutocompleteSelectedEvent) => {
    this.selectedOptions.push({
      enabled: false,
      reference: this.optionsList[event.option.value],
    });
    this.selectedOptions.sort(compareReferencesByVariantName);
    this.chipFormControl.setValue(null);
    this.chipListInput.nativeElement.value = '';
  }

  removeChip = (index: number) => {
    this.selectedOptions.splice(index, 1);
    this.chipFormControl.setValue(null);
  }

  selectionChangeChip = (event: MatChipSelectionChange, enabled: boolean) => {
    event.source.selected = enabled;
  }

}

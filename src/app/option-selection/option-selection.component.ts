import {
  COMMA,
  ENTER,
} from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  MatChipList,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {
  map,
  startWith,
} from 'rxjs/operators';

import { getVariantName } from 'src/utilities/object-helpers';
import { compareReferencesByVariantName } from 'src/utilities/sort';
import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-option-selection',
  templateUrl: './option-selection.component.html',
  styleUrls: ['./option-selection.component.scss']
})
export class OptionSelectionComponent implements AfterViewInit {

  @Input() afterViewInit: {
    index: number,
    method: (
      index: number,
      open: boolean
    ) => void,
  };
  @Input() optionReplaced: boolean;
  @Input() selectedOptions: BehaviorSubject<
    {
      enabled: boolean,
      onePerModelCount?: number,
      optionReplaced?: number,
      reference: Biomorph | Weapon,
    }[]
  >;
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
  @Input() unitLimit: boolean;

  @ViewChild(MatChipList, { static: false }) chipList: MatChipList;
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

  constructor() {
    this.afterViewInit = {
      index: 0,
      method: () => { },
    };
    this.chipFormControl = new FormControl();
    this.optionReplaced = false;
    this.optionsList = [];
    this.selectedOptions = new BehaviorSubject([]);
    this.unitLimit = false;
  }

  ngAfterViewInit() {
    this.afterViewInit.method(this.afterViewInit.index, true);
  }

  clearInput = () => {
    this.chipFormControl.setValue(null);
    this.chipListInput.nativeElement.value = '';
  }

  clickChip = (index: number) => {
    if (this.selectedOptions.value[index].enabled) {
      this.selectedOptions.value[index].enabled = false;
    } else {
      this.selectedOptions.value.filter(value => value.enabled).forEach(value => {
        value.enabled = false;
      });
      this.selectedOptions.value[index].enabled = true;
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
        !this.selectedOptions.value.map(o => getVariantName(o.reference)).includes(option.value)
      );
    });
  }

  getEnabledName = () => {
    const enabledOption = this.selectedOptions.value.find((value) => value.enabled);

    if (enabledOption) {
      return getVariantName(enabledOption.reference);
    } else {
      return 'None';
    }
  }

  getVariantNameWrapper = (value: {
    name: string;
    variant?: string;
  }) => getVariantName(value)

  optionSelected = (event: MatAutocompleteSelectedEvent) => {
    const selectedOptionsValue = this.selectedOptions.value;

    selectedOptionsValue.push({
      enabled: false,
      reference: this.optionsList[event.option.value],
    });
    selectedOptionsValue.sort(compareReferencesByVariantName);
    this.selectedOptions.next(selectedOptionsValue);
    this.chipFormControl.setValue(null);
    this.chipListInput.nativeElement.value = '';
  }

  removeChip = (index: number) => {
    const selectedOptionsValue = this.selectedOptions.value;

    selectedOptionsValue.splice(index, 1);
    this.selectedOptions.next(selectedOptionsValue);
    this.chipFormControl.setValue(null);
  }

  selectionChangeChip = (event: MatChipSelectionChange, enabled: boolean) => {
    event.source.selected = enabled;
  }

}

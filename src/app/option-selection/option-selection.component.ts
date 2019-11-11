import {
  COMMA,
  ENTER,
} from '@angular/cdk/keycodes';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import {
  MatChipList,
  MatChipSelectionChange,
} from '@angular/material/chips';
import {
  FormControl,
  Validators,
} from '@angular/forms';
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
  @Input() selectedOptions: BehaviorSubject<{
    enabled: boolean,
    reference: Biomorph | Weapon,
  }[]>;
  @Input() set setOnePerModelCount(onePerModelCount: number) {
    this.onePerModelCount = onePerModelCount;
    this.numberInputFormControl.setValue(onePerModelCount);
  }
  @Input() set setOptionReplaced(optionReplaced: number) {
    this.optionReplaced = optionReplaced;
    this.selectFormControl.setValue(optionReplaced);
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

  @ViewChild(MatChipList, { static: false }) chipList: MatChipList;
  @ViewChild(MatAutocomplete, { static: false }) chipListAuto: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger, { static: false }) chipListAutoTrigger: MatAutocompleteTrigger;
  @ViewChild('chipListInput', { static: false }) chipListInput: ElementRef<HTMLInputElement>;

  readonly separatorKeysCodes: number[] = [
    COMMA,
    ENTER,
  ];

  chipFormControl: FormControl;
  numberInputFormControl: FormControl;
  selectFormControl: FormControl;

  filteredOptions: Observable<{
    index: number,
    value: string,
  }[]>;
  isHandset: boolean;
  onePerModelCount?: number;
  optionReplaced?: number;
  optionsList: (Biomorph | Weapon)[];

  constructor(breakpointObserver: BreakpointObserver) {
    this.afterViewInit = {
      index: 0,
      method: () => { },
    };

    this.chipFormControl = new FormControl();
    this.numberInputFormControl = new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]);
    this.selectFormControl = new FormControl();

    this.isHandset = false;
    this.optionsList = [];
    this.selectedOptions = new BehaviorSubject([]);

    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
    ]).subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  ngAfterViewInit() {
    const {
      index,
      method,
    } = this.afterViewInit;

    method(index, true);
  }

  blurInput = () => {
    if (!this.chipListAuto.isOpen) {
      this.clearInput();
    }
  }

  clearInput = () => {
    this.chipFormControl.setValue(null);
    this.chipListInput.nativeElement.value = '';
  }

  clickChip = (index: number) => {
    const enabled = this.selectedOptions.value[index].enabled;

    if (!enabled) {
      this.selectedOptions.value.filter(value => value.enabled).forEach(value => {
        value.enabled = false;
      });
    }

    this.selectedOptions.value[index].enabled = !enabled;
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
    this.clearInput();
  }

  removeChip = (index: number) => {
    const selectedOptionsValue = this.selectedOptions.value;

    selectedOptionsValue.splice(index, 1);
    this.selectedOptions.next(selectedOptionsValue);
    this.clearInput();
  }

  selectionChangeChip = (event: MatChipSelectionChange, enabled: boolean) => {
    event.source.selected = enabled;
  }

}

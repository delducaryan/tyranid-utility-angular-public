import {
  Component,
  DebugElement,
  ViewChild,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

import { MaterialModules } from 'src/app/material.imports';

import { OptionSelectionComponent } from './option-selection.component';

import { getVariantName } from 'src/utilities/object-helpers';
import Biomorph from 'src/models/biomorph';
import Weapon from 'src/models/weapon';

@Component({
  selector: 'app-test-parent',
  template: '<app-option-selection></app-option-selection>'
})
class TestParentComponent {
  @ViewChild(OptionSelectionComponent, { static: false }) component: OptionSelectionComponent;
}

fdescribe('OptionSelectionComponent', () => {
  let component: OptionSelectionComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<TestParentComponent>;
  let selectedOptions: {
    enabled: boolean,
    reference: Biomorph | Weapon,
  }[];
  let optionsList: (Biomorph | Weapon)[];
  let testFunctionCalled;

  const testFunction = () => {
    testFunctionCalled = true;
  };

  const reset = () => {
    selectedOptions = [
      {
        enabled: false,
        reference: ({
          name: 'A',
          variant: 'B',
        } as Biomorph | Weapon),
      },
      {
        enabled: false,
        reference: ({
          name: 'B',
          variant: 'C',
        } as Biomorph | Weapon),
      },
      {
        enabled: false,
        reference: ({
          name: 'C',
          variant: 'A',
        } as Biomorph | Weapon),
      },
    ];
    optionsList = [
      selectedOptions[0].reference,
      selectedOptions[1].reference,
      selectedOptions[2].reference,
    ];
    testFunctionCalled = false;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OptionSelectionComponent,
        TestParentComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModules,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestParentComponent);
    debug = fixture.debugElement;

    fixture.detectChanges();

    component = fixture.componentInstance.component;

    reset();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should start with empty selected options', () => {
    expect(component.selectedOptions.value.length).toBe(0);
  });

  it('should start with selected options', () => {
    component.selectedOptions = new BehaviorSubject(selectedOptions);

    fixture.detectChanges();

    expect(component.selectedOptions.value.length).toBe(selectedOptions.length);
  });

  it('should render selected options as chips', () => {
    component.selectedOptions = new BehaviorSubject(selectedOptions);

    fixture.detectChanges();

    const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip') as NodeListOf<HTMLElement>;

    expect(chips.length).toBe(selectedOptions.length);

    chips.forEach((value, index) => {
      expect(value.textContent).toContain(getVariantName(selectedOptions[index].reference));
    });
  });

  it('should start with an optionsList', () => {
    component.setOptionsList = optionsList;

    fixture.detectChanges();

    expect(component.optionsList.length).toBe(optionsList.length);
  });

  it('should start with undefined filteredOptions', () => {
    expect(component.filteredOptions).toBeUndefined();
  });

  it('should start with filteredOptions', async(() => {
    component.setOptionsList = optionsList;

    fixture.whenStable().then(() => {
      component.filteredOptions.subscribe(value => expect(value.length).toBe(optionsList.length));
    });
  }));

  it('should start with a blank input', () => {
    expect(component.chipListInput.nativeElement.value).toBe('');
  });

  xit('should test valueChanges', async(() => {
    component.setOptionsList = optionsList;

    component.chipFormControl.setValue('A');

    fixture.whenStable().then(() => {
      component.filteredOptions.subscribe(value => {
        expect(value.length).toBe(2);
      });
    });
  }));

  it('should clear the input', () => {
    component.chipFormControl.setValue('test');
    component.chipListInput.nativeElement.value = 'test';

    expect(component.chipListInput.nativeElement.value).toBe('test');
    expect(component.chipFormControl.value).toBe('test');

    component.clearInput();

    expect(component.chipListInput.nativeElement.value).toBe('');
    expect(component.chipFormControl.value).toBe(null);
  });

  it('should call clearInput on blur', () => {
    component.clearInput = testFunction;

    component.chipListInput.nativeElement.dispatchEvent(new FocusEvent('blur'));

    expect(testFunctionCalled).toBe(true);
  });

  it('should select an option', () => {
    [0, 1, 2].forEach(index => {
      component.selectedOptions = new BehaviorSubject(selectedOptions);

      component.selectedOptions.value.forEach(value => {
        expect(value.enabled).toBe(false);
      });

      component.clickChip(index);

      component.selectedOptions.value.forEach((value, i) => {
        expect(value.enabled).toBe(i === index ? true : false);
      });

      reset();
    });
  });

  it('should deselect an option', () => {
    [0, 1, 2].forEach(index => {
      selectedOptions[index].enabled = true;

      component.selectedOptions = new BehaviorSubject(selectedOptions);

      component.selectedOptions.value.forEach((value, i) => {
        expect(value.enabled).toBe(i === index ? true : false);
      });

      component.clickChip(index);

      component.selectedOptions.value.forEach(value => {
        expect(value.enabled).toBe(false);
      });

      reset();
    });
  });

  it('should select one option at a time', () => {
    [0, 1, 2].forEach(index => {
      selectedOptions[index].enabled = true;

      component.selectedOptions = new BehaviorSubject(selectedOptions);

      component.selectedOptions.value.forEach((value, i) => {
        expect(value.enabled).toBe(i === index ? true : false);
      });

      component.clickChip(index === 2 ? 0 : (index + 1));

      if (index === 2) {
        expect(component.selectedOptions.value[0].enabled).toBe(true);
        expect(component.selectedOptions.value[1].enabled).toBe(false);
        expect(component.selectedOptions.value[2].enabled).toBe(false);
      } else {
        component.selectedOptions.value.forEach((value, i) => {
          if (i <= index) {
            expect(value.enabled).toBe(false);
          } else if (i === (index + 1)) {
            expect(value.enabled).toBe(true);
          } else {
            expect(value.enabled).toBe(false);
          }
        });
      }

      reset();
    });
  });

  it('should call clickChip on click', () => {
    component.selectedOptions = new BehaviorSubject(selectedOptions);
    component.clickChip = testFunction;

    fixture.detectChanges();

    const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip') as NodeListOf<HTMLElement>;

    chips.item(0).dispatchEvent(new MouseEvent('click'));

    expect(testFunctionCalled).toBe(true);
  });

  it('should filter options', () => {
    ['', 'A', 'B', 'C'].forEach(filter => {
      component.optionsList = optionsList;

      const filteredOptions = component.filterOptions(filter);

      const answerKey = optionsList.map((value, i) => ({
        index: i,
        value: getVariantName(value),
      })).filter(option => option.value.includes(filter));

      expect(filteredOptions).toEqual(answerKey);
    });
  });

  it('should filter options (undefinedChipList)', () => {
    component.optionsList = optionsList;
    component.chipList = undefined;

    const filteredOptions = component.filterOptions('');

    expect(filteredOptions).toEqual([
      {
        index: 0,
        value: getVariantName(optionsList[0]),
      },
      {
        index: 1,
        value: getVariantName(optionsList[1]),
      },
      {
        index: 2,
        value: getVariantName(optionsList[2]),
      },
    ]);
  });

  it('should return None for no enabled selections', () => {
    selectedOptions[1].enabled = false;

    component.selectedOptions = new BehaviorSubject(selectedOptions);

    expect(component.getEnabledName()).toBe('None');
  });

  it('should get the name of the enabled selection', () => {
    selectedOptions[0].enabled = true;

    component.selectedOptions = new BehaviorSubject(selectedOptions);

    expect(component.getEnabledName()).toBe(getVariantName(selectedOptions[0].reference));
  });

  it('should wrap getVariantName', () => {
    expect(component.getVariantNameWrapper(selectedOptions[0].reference)).toBe(getVariantName(selectedOptions[0].reference));
  });


});

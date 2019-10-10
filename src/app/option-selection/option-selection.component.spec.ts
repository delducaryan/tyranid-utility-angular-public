import { DebugElement, Component, ViewChild } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModules } from 'src/app/material.imports';

import { OptionSelectionComponent } from './option-selection.component';

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
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should start with no selected options', () => {
    expect(component.selectedOptions.length).toBe(0);
  });

  it('should start with no filteredOptions', () => {
    expect(component.filteredOptions).toBeUndefined();
  });

  it('should start with a blank input', () => {
    expect(component.chipListInput.nativeElement.value).toBe('');
  });

  describe('Biomorphs', () => {
    it('should start with selected options', () => {
      component.init = [
        {
          enabled: false,
          reference: new Biomorph(),
        },
        {
          enabled: false,
          reference: new Biomorph(),
        },
        {
          enabled: false,
          reference: new Biomorph(),
        },
      ];

      fixture.detectChanges();

      expect(component.selectedOptions.length).toBe(3);
    });

    it('should render selected options as chips', () => {
      component.init = [
        {
          enabled: false,
          reference: new Biomorph(),
        },
        {
          enabled: false,
          reference: new Biomorph(),
        },
        {
          enabled: false,
          reference: new Biomorph(),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');

      expect(chips.length).toBe(3);
    });

    it('should render selected options as chips in sorted order', () => {
      component.init = [
        {
          enabled: false,
          reference: new Biomorph({ name: 'C' } as Biomorph),
        },
        {
          enabled: false,
          reference: new Biomorph({ name: 'A' } as Biomorph),
        },
        {
          enabled: false,
          reference: new Biomorph({ name: 'B' } as Biomorph),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');
      const orderedNames = [
        ' A ',
        ' B ',
        ' C ',
      ];

      let chipsInOrder = true;

      chips.forEach((chip, index) => {
        if (!chip.textContent.includes(orderedNames[index])) {
          chipsInOrder = false;
        }
      });

      expect(chipsInOrder).toBe(true);
    });

    it('should render selected options with variants as chips in sorted order', () => {
      component.init = [
        {
          enabled: false,
          reference: new Biomorph({
            name: 'C',
            variant: 'A',
          } as Biomorph),
        },
        {
          enabled: false,
          reference: new Biomorph({
            name: 'A',
            variant: 'B',
          } as Biomorph),
        },
        {
          enabled: false,
          reference: new Biomorph({
            name: 'B',
            variant: 'C',
          } as Biomorph),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');
      const orderedNames = [
        ' A (B) ',
        ' B (C) ',
        ' C (A) ',
      ];

      let chipsInOrder = true;

      chips.forEach((chip, index) => {
        if (!chip.textContent.includes(orderedNames[index])) {
          chipsInOrder = false;
        }
      });

      expect(chipsInOrder).toBe(true);
    });

    it('should start with an optionsList', () => {
      component.setOptionsList = [
        new Biomorph(),
        new Biomorph(),
        new Biomorph(),
      ];

      fixture.detectChanges();

      expect(component.optionsList.length).toBe(3);
    });

    fit('should start with filteredOptions', async(() => {
      component.setOptionsList = [
        new Biomorph(),
        new Biomorph(),
        new Biomorph(),
      ];

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        console.log((debug.nativeElement as HTMLElement).querySelectorAll('mat-autocomplete'));

        expect(component.filteredOptions).toBeDefined();
      });
    }));
  });

  describe('Weapons', () => {
    it('should start with selected options', () => {
      component.init = [
        {
          enabled: false,
          reference: new Weapon(),
        },
        {
          enabled: false,
          reference: new Weapon(),
        },
        {
          enabled: false,
          reference: new Weapon(),
        },
      ];

      fixture.detectChanges();

      expect(component.selectedOptions.length).toBe(3);
    });

    it('should render selected options as chips', () => {
      component.init = [
        {
          enabled: false,
          reference: new Weapon(),
        },
        {
          enabled: false,
          reference: new Weapon(),
        },
        {
          enabled: false,
          reference: new Weapon(),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');

      expect(chips.length).toBe(3);
    });

    it('should render selected options as chips in sorted order', () => {
      component.init = [
        {
          enabled: false,
          reference: new Weapon({ name: 'C' } as Weapon),
        },
        {
          enabled: false,
          reference: new Weapon({ name: 'A' } as Weapon),
        },
        {
          enabled: false,
          reference: new Weapon({ name: 'B' } as Weapon),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');
      const orderedNames = [
        ' A ',
        ' B ',
        ' C ',
      ];

      let chipsInOrder = true;

      chips.forEach((chip, index) => {
        if (!chip.textContent.includes(orderedNames[index])) {
          chipsInOrder = false;
        }
      });

      expect(chipsInOrder).toBe(true);
    });

    it('should render selected options with variants as chips in sorted order', () => {
      component.init = [
        {
          enabled: false,
          reference: new Weapon({
            name: 'C',
            variant: 'A',
          } as Weapon),
        },
        {
          enabled: false,
          reference: new Weapon({
            name: 'A',
            variant: 'B',
          } as Weapon),
        },
        {
          enabled: false,
          reference: new Weapon({
            name: 'B',
            variant: 'C',
          } as Weapon),
        },
      ];

      fixture.detectChanges();

      const chips = (debug.nativeElement as HTMLElement).querySelectorAll('mat-chip');
      const orderedNames = [
        ' A (B) ',
        ' B (C) ',
        ' C (A) ',
      ];

      let chipsInOrder = true;

      chips.forEach((chip, index) => {
        if (!chip.textContent.includes(orderedNames[index])) {
          chipsInOrder = false;
        }
      });

      expect(chipsInOrder).toBe(true);
    });

    it('should start with an optionsList', () => {
      component.setOptionsList = [
        new Weapon(),
        new Weapon(),
        new Weapon(),
      ];

      fixture.detectChanges();

      expect(component.optionsList.length).toBe(3);
    });
  });
});

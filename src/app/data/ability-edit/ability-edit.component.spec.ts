import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityEditComponent } from './ability-edit.component';

describe('AbilityEditComponent', () => {
  let component: AbilityEditComponent;
  let fixture: ComponentFixture<AbilityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

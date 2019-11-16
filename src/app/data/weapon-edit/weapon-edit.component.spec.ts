import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponEditComponent } from './weapon-edit.component';

describe('WeaponEditComponent', () => {
  let component: WeaponEditComponent;
  let fixture: ComponentFixture<WeaponEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

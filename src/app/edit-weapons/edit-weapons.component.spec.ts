import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeaponsComponent } from './edit-weapons.component';

describe('EditWeaponsComponent', () => {
  let component: EditWeaponsComponent;
  let fixture: ComponentFixture<EditWeaponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeaponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

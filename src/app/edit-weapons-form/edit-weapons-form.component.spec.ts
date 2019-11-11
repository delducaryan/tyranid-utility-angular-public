import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeaponsFormComponent } from './edit-weapons-form.component';

describe('EditWeaponsFormComponent', () => {
  let component: EditWeaponsFormComponent;
  let fixture: ComponentFixture<EditWeaponsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeaponsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeaponsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

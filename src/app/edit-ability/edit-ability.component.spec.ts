import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbilityComponent } from './edit-ability.component';

describe('EditAbilityComponent', () => {
  let component: EditAbilityComponent;
  let fixture: ComponentFixture<EditAbilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAbilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

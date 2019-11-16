import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomorphEditComponent } from './biomorph-edit.component';

describe('BiomorphEditComponent', () => {
  let component: BiomorphEditComponent;
  let fixture: ComponentFixture<BiomorphEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomorphEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomorphEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

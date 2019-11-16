import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomorphDialogComponent } from './biomorph-dialog.component';

describe('BiomorphDialogComponent', () => {
  let component: BiomorphDialogComponent;
  let fixture: ComponentFixture<BiomorphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomorphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomorphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

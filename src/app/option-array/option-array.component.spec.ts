import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionArrayComponent } from './option-array.component';

describe('OptionArrayComponent', () => {
  let component: OptionArrayComponent;
  let fixture: ComponentFixture<OptionArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

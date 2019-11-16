import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomorphListComponent } from './biomorph-list.component';

describe('BiomorphListComponent', () => {
  let component: BiomorphListComponent;
  let fixture: ComponentFixture<BiomorphListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiomorphListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiomorphListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestViewDataComponent } from './test-view-data.component';

describe('TestViewDataComponent', () => {
  let component: TestViewDataComponent;
  let fixture: ComponentFixture<TestViewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestViewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test3Component } from './test3-component';

describe('Test3Component', () => {
  let component: Test3Component;
  let fixture: ComponentFixture<Test3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test3Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

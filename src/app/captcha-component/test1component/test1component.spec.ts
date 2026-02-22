import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test1component } from './test1component';

describe('Test1component', () => {
  let component: Test1component;
  let fixture: ComponentFixture<Test1component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test1component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test1component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

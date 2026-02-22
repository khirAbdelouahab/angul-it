import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2component } from './test2component';

describe('Test2component', () => {
  let component: Test2component;
  let fixture: ComponentFixture<Test2component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test2component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test2component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

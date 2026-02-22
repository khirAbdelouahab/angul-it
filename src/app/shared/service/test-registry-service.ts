import { Injectable, Type } from '@angular/core';
import { ITestComponent } from '../interface/itest-component';
import { Test1component } from '../../captcha-component/test1component/test1component';
import { Test2component } from '../../captcha-component/test2component/test2component';

@Injectable({
  providedIn: 'root',
})
export class TestRegistryService {
  private registry = new Map<number, Type<ITestComponent>>();

  constructor() {
    this.registry.set(1, Test1component);
    this.registry.set(2, Test2component);
  }

  register(level: number, component: Type<ITestComponent>) {
    this.registry.set(level, component);
  }

  getComponent(selectedLevel: number) : Type<ITestComponent> | undefined {
    return this.registry.get(selectedLevel);
  }
}

import { Injectable, Type } from '@angular/core';
import { ITestComponent } from '../interface/itest-component';
import { Test1component } from '../../captcha-component/test1component/test1component';
import { Test2component } from '../../captcha-component/test2component/test2component';
import { TestStatistics } from '../interface/test';

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

  getAllRegistredLevelsStatistics(): TestStatistics[] {
    const LevelsStatistics: TestStatistics[] = [];
    this.registry.forEach((componentType, level) => {
      const test = new componentType();
      LevelsStatistics.push(
        {
          Level_Number: level,
          Level_Title: test.question,
          Level_Question: test.question,
          Total_Attempts: 0,
          Total_Failures: 0,
          Total_Successes: 0,
          Success_Rate: 0
        }
      )
    })
    return LevelsStatistics;
  }

  getComponent(selectedLevel: number): Type<ITestComponent> | undefined {
    return this.registry.get(selectedLevel);
  }
}

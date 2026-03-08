import { AfterViewInit, Component, ComponentRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { ITestComponent } from '../shared/interface/itest-component';
import { TestRegistryService } from '../shared/service/test-registry-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastService } from '../toast-component/toast-service';
import { StateService } from '../shared/service/state-service';
import { TestStatistics } from '../shared/interface/test';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha-component',
  imports: [CommonModule],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css',
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {

  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;
  selectedLevel: number = 1;
  private LevelsStatistics: TestStatistics[] = [];
  private currentLevelStatistics: TestStatistics | undefined = undefined;
  currentComponent?: ComponentRef<ITestComponent>;
  constructor(private router: Router, private stateService: StateService, private testRegistry: TestRegistryService, private toastService: ToastService, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnDestroy(): void {
    console.log('destroyed: captcha-component');    
    this.stateService.clearState('selectedLevel');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadComponent();
    }
  }

  loadComponent() {
    this.container.clear();
    this.loadState();
    const componentType = this.testRegistry.getComponent(this.selectedLevel);
    if (componentType) {
      this.currentComponent = this.container.createComponent(componentType);
      this.currentLevelStatistics =
      {
        Level_Number: this.selectedLevel,
        Level_Title: this.currentComponent?.instance.Title,
        Level_Question: this.currentComponent?.instance.question,
        Total_Attempts: 0,
        Total_Failures: 0,
        Total_Successes: 0,
        Success_Rate: 0
      }
      this.currentComponent.instance.onTestResult.subscribe((result: boolean) => {
        if (result) {
          this.toastService.success('test succeseded');
          this.stateService.saveState('selectedLevel', { selectedLevel: this.selectedLevel + 1 });
          if (this.currentLevelStatistics) {
            this.currentLevelStatistics = {
              ...this.currentLevelStatistics,
              Total_Attempts: this.currentLevelStatistics.Total_Attempts + 1,
              Total_Successes: this.currentLevelStatistics.Total_Successes + 1
            };
            const existing = this.stateService.loadState('statistics');
            if (existing && Array.isArray(existing)) {
              this.LevelsStatistics = existing;
            } else {
              this.LevelsStatistics = [];
            }
            this.LevelsStatistics.push({
              Level_Number: this.selectedLevel,
              Level_Title: this.currentLevelStatistics.Level_Title,
              Level_Question: this.currentLevelStatistics.Level_Question,
              Total_Attempts: this.currentLevelStatistics.Total_Attempts,
              Total_Failures: this.currentLevelStatistics.Total_Failures,
              Total_Successes: this.currentLevelStatistics.Total_Successes,
              Success_Rate: this.currentLevelStatistics.Success_Rate
            });
          }
          this.stateService.saveState('statistics', [...this.LevelsStatistics]);
          this.loadComponent();
        } else {
          this.toastService.error('wrong answer try again');
          if (this.currentLevelStatistics) {
            this.currentLevelStatistics = {
              ...this.currentLevelStatistics,
              Total_Attempts: this.currentLevelStatistics.Total_Attempts + 1,
              Total_Failures: this.currentLevelStatistics.Total_Failures + 1
            };
          }
        }
        console.log(`Current Level Statistics: `, this.currentLevelStatistics);
        console.log(`All Levels Statistics: `, this.LevelsStatistics);
      })
    } else {
      this.router.navigate(['/result']);
    }
  }

  loadState() {
    const level = this.stateService.loadState('selectedLevel');
    if (level) {
      this.selectedLevel = level.selectedLevel;
    } else {
      this.stateService.saveState('selectedLevel', { selectedLevel: 1 });
      this.selectedLevel = 1;
    }
  }
}

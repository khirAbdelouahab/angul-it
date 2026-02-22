import { AfterViewInit, Component, ComponentRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { ITestComponent } from '../shared/interface/itest-component';
import { TestRegistryService } from '../shared/service/test-registry-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastService } from '../toast-component/toast-service';
import { StateService } from '../shared/service/state-service';

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
  currentComponent?: ComponentRef<ITestComponent>;
  constructor(private stateService: StateService, private testRegistry: TestRegistryService, private toastService: ToastService, @Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnDestroy(): void {
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
      this.currentComponent.instance.onTestResult.subscribe((result: boolean) => {
        if (result) {
          this.toastService.success('test succeseded');
          this.stateService.saveState('selectedLevel', { selectedLevel: this.selectedLevel + 1 });
          this.loadComponent();
        } else {
          this.toastService.error('wrong answer try again');
        }
      })
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

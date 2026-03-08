import { Routes } from '@angular/router';
import { ResultComponent } from './result-component/result-component';
import { HomeComponent } from './home-component/home-component';
import { resultGuardGuard } from './guards/result-guard-guard';
import { CaptchaComponent } from './captcha-component/captcha-component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'captcha', component: CaptchaComponent },
    { path: 'result', component: ResultComponent, canActivate: [resultGuardGuard] }
];

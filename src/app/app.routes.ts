import { Routes } from '@angular/router';
import { ResultComponent } from './result-component/result-component';
import { HomeComponent } from './home-component/home-component';
import { resultGuardGuard } from './guards/result-guard-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result', component: ResultComponent, canActivate: [resultGuardGuard] }
];

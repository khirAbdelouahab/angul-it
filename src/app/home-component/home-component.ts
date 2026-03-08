import { Component, OnInit } from '@angular/core';
import { StateService } from '../shared/service/state-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  constructor(private stateService: StateService, private router: Router) { }
  ngOnInit(): void {
    this.stateService.clearAllState();
  }

  startCaptcha() {
    this.router.navigate(['/captcha']);
  }
}

import { Component, OnInit } from '@angular/core';
import { StateService } from '../shared/service/state-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  constructor(private stateService: StateService) { }
  ngOnInit(): void {
    this.stateService.clearAllState();
  }

  startCaptcha() {

  }
}

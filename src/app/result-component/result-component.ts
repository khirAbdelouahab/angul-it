import { Component, OnInit } from '@angular/core';
import { TestStatistics } from '../shared/interface/test';
import { StateService } from '../shared/service/state-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-component',
  imports: [CommonModule],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css',
})
export class ResultComponent implements OnInit {
  LevelsStatistics: TestStatistics[] | undefined = undefined;
  constructor(private stateService: StateService, private router: Router) { }
  ngOnInit(): void {
    const statistics: TestStatistics[] = this.stateService.loadState('statistics');
    this.LevelsStatistics = statistics;
    console.log('statistics Loaded from Result Component: ', statistics);
  }

  getTotalFailures(): number {
    let total: number = 0;
    this.LevelsStatistics?.forEach((level) => {
      total += level.Total_Failures;
    })
    return total;
  }

  getTotalAttempts(): number {
    let total: number = 0;
    this.LevelsStatistics?.forEach((level) => {
      total += level.Total_Attempts;
    })
    return total;
  }

  getTotalSuccesses(): number {
    let total: number = 0;
    this.LevelsStatistics?.forEach((level) => {
      total += level.Total_Successes;
    })
    return total;
  }

  restartChallenge() {
    this.router.navigate(['']);
  }

  goHome() {
    this.restartChallenge();
  }

}

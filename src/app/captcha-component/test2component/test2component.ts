import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ITestComponent } from '../../shared/interface/itest-component';
import { Test } from '../../shared/interface/test';
import { MathService } from '../../shared/service/math-service';

@Component({
  selector: 'app-test2component',
  imports: [],
  templateUrl: './test2component.html',
  styleUrl: './test2component.css',
})
export class Test2component implements ITestComponent, OnInit {
  @Output() onTestResult = new EventEmitter<boolean>;
  submitButtonEnabled = signal(false);
  ngOnInit(): void {
    this.start();
  }
  numberOfFailures: number = 0;
  mathService = inject(MathService);
  activeCells: number = 2;
  activeCell = signal('');
  Title: string = 'Memory Challenge';

  currentTest: Test =
    {
      question: 'Select Every Cell Selected By Order',
      Title: this.Title,
      possibilities: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      correctAnswer: []
    }
  question: string = this.currentTest.question;

  answer: string[] = [];
  start() {
    for (let i = 0; i < this.activeCells; i++) {
      setTimeout(() => {
        const randomIndex = Math.floor(this.mathService.getRandomArbitrary(0, this.currentTest.possibilities.length));
        this.activeCell.set(this.currentTest.possibilities[randomIndex]);
        this.currentTest.correctAnswer.push(this.currentTest.possibilities[randomIndex]);
        setTimeout(() => {
          this.activeCell.set(''); // Clear it
        }, 250);
      }, i * 500);
    }
    this.submitButtonEnabled.set(true);
  }

  cellClick(cell: string) {
    this.answer.push(cell);
    this.activeCell.set(cell);

  }

  solve(): void {
    this.activeCell.set('');
    if (this.answer.length == this.activeCells) {
      if (JSON.stringify(this.answer) === JSON.stringify(this.currentTest.correctAnswer)) {
        this.onTestResult.emit(true);
        return;
      }
    }
    this.answer = [];
    this.onTestResult.emit(false);
  }
  restart(): void {
    throw new Error('Method not implemented.');
  }

}

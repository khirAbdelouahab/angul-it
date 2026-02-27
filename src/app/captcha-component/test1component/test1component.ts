import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITestComponent } from '../../shared/interface/itest-component';
import { Test } from '../../shared/interface/test';
import { MathService } from '../../shared/service/math-service';

@Component({
  selector: 'app-test1component',
  imports: [FormsModule],
  templateUrl: './test1component.html',
  styleUrl: './test1component.css',
})
export class Test1component implements ITestComponent {
  question: string = '';
  Title: string = 'Logic Challenge';
  constructor() {
    this.currentTest = this.getQuestion();
    this.question = this.currentTest.question;
  }
  numberOfFailures: number = 0;

  mathService = inject(MathService);

  allTests: Test[] = [
    {
      question: 'What is the capital of France?',
      Title: this.Title,
      possibilities: ['madrid', 'paris', 'rabat', 'starsburg'],
      correctAnswer: 'paris'
    },
    {
      question: 'ماهو الشهر الذي انزل فيه القران ؟',
      Title: this.Title,
      possibilities: ['شعبان', 'محرم', 'رمضان', 'شوال'],
      correctAnswer: 'رمضان'
    },
    {
      question: 'which of these protocols works in the application layer ?',
      Title: this.Title,
      possibilities: ['TCP', 'HTTP', 'ARP', 'HTML'],
      correctAnswer: 'HTTP'
    }
  ]
  @Output() onTestResult = new EventEmitter<boolean>;



  currentTest: Test = {
    question: '',
    Title:this.Title,
    possibilities: null,
    correctAnswer: null
  };

  solve(): void {
    if (!this.answer) {
      this.onTestResult.emit(false);
      return;
    }
    if (this.currentTest.correctAnswer == this.answer) {
      this.onTestResult.emit(true);
    } else {
      this.onTestResult.emit(false);
    }
  }



  getQuestion(): Test {
    const value: number = Math.floor(this.mathService.getRandomArbitrary(0, this.allTests.length));
    return this.allTests[value];
  }

  restart(): void {
    throw new Error('Method not implemented.');
  }
  answer: any;
}

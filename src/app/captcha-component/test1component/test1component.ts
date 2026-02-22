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
export class Test1component implements ITestComponent, OnInit {
  ngOnInit(): void {
    this.currentTest = this.getQuestion();
  }

  mathService = inject(MathService);

  allTests: Test[] = [
    {
      question: 'question 1',
      possibilities: ['p1', 'p2'],
      correctAnswer: 'p1'
    },
    {
      question: 'question 2',
      possibilities: ['p3', 'p4'],
      correctAnswer: 'p3'
    },
    {
      question: 'question 3',
      possibilities: ['p5', 'p6'],
      correctAnswer: 'p6'
    }
  ]
  @Output() onTestResult = new EventEmitter<boolean>;

  question: string = '';

  currentTest: Test = {
    question: '',
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
    console.log(value);
    return this.allTests[value];
  }

  restart(): void {
    throw new Error('Method not implemented.');
  }

  answer: any;
}

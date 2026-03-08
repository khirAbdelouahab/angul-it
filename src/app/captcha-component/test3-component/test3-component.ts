import { Component, EventEmitter, signal } from '@angular/core';
import { ITestComponent } from '../../shared/interface/itest-component';
import { Test } from '../../shared/interface/test';

@Component({
  selector: 'app-test3-component',
  imports: [],
  templateUrl: './test3-component.html',
  styleUrl: './test3-component.css',
})
export class Test3Component implements ITestComponent {
  question: string = 'Select All Cats Images';
  answer: string[] = [];
  onTestResult = new EventEmitter<boolean>;
  numberOfFailures: number = 0;
  Title: string = 'Image Challenge';

  currentTest: Test =
    {
      question: this.question,
      Title: this.Title,
      possibilities: ['traffic-light-2', 'car-1', 'road-1', 'road-2', 'car-2', 'road-3', 'traffic-light-1', 'traffic-light-3', 'car-3'],
      correctAnswer: ['car-1', 'car-2', 'car-3']
    }
  solve(): void {
    this.onTestResult.emit(this.arraysEqualIgnoreOrder(this.answer, this.currentTest.correctAnswer));
  }
  restart(): void {
    throw new Error('Method not implemented.');
  }

  cellClick(cell: any) {
    if (this.answer.includes(cell)) {
      this.answer = this.answer.filter((c) => {
        return cell != c;
      })
    } else {
      this.answer.push(cell);
    }
  }

  isSelected(cell: any): boolean {
    return this.answer.includes(cell);
  }

  arraysEqualIgnoreOrder(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;

    const sortedA = [...a].sort();
    const sortedB = [...b].sort();

    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  }
}

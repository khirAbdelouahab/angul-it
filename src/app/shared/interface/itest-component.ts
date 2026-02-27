import { EventEmitter } from "@angular/core";

export interface ITestComponent {
    question: string;
    answer: any;
    onTestResult: EventEmitter<boolean>;
    numberOfFailures:number;
    Title:string;
    solve(): void;
    restart(): void;
}

import { EventEmitter } from "@angular/core";

export interface ITestComponent {
    question: string;
    answer: any;
    onTestResult: EventEmitter<boolean>;
    solve(): void;
    restart(): void;
}

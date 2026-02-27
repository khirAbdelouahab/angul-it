export interface Test {
    question:string;
    Title:string;
    possibilities:any;
    correctAnswer:any;
}

export interface TestStatistics {
    Level_Number:number;
    Level_Question:string | undefined;
    Level_Title:string | undefined;
    Total_Successes:number;
    Total_Attempts:number;
    Success_Rate:number;
    Total_Failures:number;
}

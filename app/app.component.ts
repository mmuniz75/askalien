import { Component } from '@angular/core';
import { AskService } from './ask.service';
import { IQuestion } from './question';

@Component({
    selector: 'pm-app',

    templateUrl: 'app/questions.component.html',
    providers: [AskService]

})
export class AppComponent {

    questions: IQuestion[];
    userQuestion: String;
    errorMessage: string;

    constructor(private _askService: AskService) {
    }

    searchQuestion(): void {
        this._askService.ask(this.userQuestion)
            .subscribe(questions => this.questions = questions,
            error => this.errorMessage = <any>error);
    }


}

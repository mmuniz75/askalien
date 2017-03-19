import { Component,ViewChildren,ElementRef,QueryList } from '@angular/core';
import { AskService } from './ask.service';
import { IQuestion } from './question';

@Component({
    selector: 'pm-app',

    templateUrl: 'app/questions.component.html',
    providers: [AskService]

})
export class AppComponent {

    public static DEACTIVE_QUESTION_CLASS = 'iquestion-wrapper';
    public static ACTIVE_QUESTION_CLASS = 'iquestion-wrapper is-active';

    public static DISPLAY_ANSWER_CLASS = 'iquestion_answer-animation';
    public static HIDE_ANSWER_CLASS = 'iquestion_answer';

    public static LABEL_ANSWER_VIEW = 'View the answer →';
    public static LABEL_ANSWER_HIDE = 'Hide Answer';

    public static LABEL_COMMENT_VIEW = 'Comment';
    public static LABEL_COMMENT_HIDE = 'Close Comment';

    questions: IQuestion[];
    userQuestion: String;
    errorMessage: string;

    commentFormEmail: String;
    commentFormName:String;
    commentFormComments:String;

    searchDone : Boolean;
    searchProcessing : Boolean;
    questionProcessing : Boolean[];

    @ViewChildren('divContent') divContent:QueryList<ElementRef>;
    
    constructor(private _askService: AskService) {
    }

    searchQuestion(): void {
        this.searchProcessing = true;
        this.searchDone = true;
        this._askService.ask(this.userQuestion)
            .subscribe(questions => {
                                this.questions = questions
                                this.searchProcessing = false;
                                this.questionProcessing = new Array<Boolean>(questions.length);
                       },
            error => this.errorMessage = <any>error);
    }

    resetSearchDone():void{
        this.searchDone = false;
        this.questions = null;
    }

    
    switchAnswer(question: IQuestion, posi: number) {
        if (!question.answer) {
            this.questionProcessing[posi] = true;
            this._askService.getAnswer(question.number,this.userQuestion)
                .subscribe(answer => {  question.answer = answer; 
                                        this.questionProcessing[posi] = false;
                                        question.isActive = true; 
                                        this.divContent.toArray()[posi].nativeElement.innerHTML  = answer.content;
                                    },
                           error => this.errorMessage = <any>error)
                ;
        }else {
            question.isActive = !question.isActive; 
            if(!question.isActive)
                question.isCommentActive = false;
        }            
    }    

    getQuestionClass(question: IQuestion): String {
        return question.isActive ? AppComponent.ACTIVE_QUESTION_CLASS : AppComponent.DEACTIVE_QUESTION_CLASS;
    }

    getAnswerClass(question: IQuestion): String {
        return question.isActive ? AppComponent.DISPLAY_ANSWER_CLASS : AppComponent.HIDE_ANSWER_CLASS;
    }

    getLabelAnwerLink(question: IQuestion) : String{
        return question.isActive?AppComponent.LABEL_ANSWER_HIDE:AppComponent.LABEL_ANSWER_VIEW;
    }

     getLabelCommnetLink(question: IQuestion) : String{
        return question.isCommentActive?AppComponent.LABEL_COMMENT_HIDE:AppComponent.LABEL_COMMENT_VIEW;
    }

    switchComment(question: IQuestion){
        this.commentFormComments = '';
        question.isCommentActive = !question.isCommentActive;
        question.isCommentSentFailed = false;
    }

    sendComment(question: IQuestion):void{
        this._askService.sendFeedBack(question.answer.questionId,this.commentFormName,this.commentFormEmail,this.commentFormComments)
        .subscribe(data => {
            question.isCommentSent = true;
            question.isCommentSentFailed = false;
        }, error => {
            question.isCommentSent = false;
            question.isCommentSentFailed = true;
        });
        
    }

}

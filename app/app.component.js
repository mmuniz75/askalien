"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ask_service_1 = require("./ask.service");
var AppComponent = AppComponent_1 = (function () {
    function AppComponent(_askService) {
        this._askService = _askService;
    }
    AppComponent.prototype.searchQuestion = function () {
        var _this = this;
        this._askService.ask(this.userQuestion)
            .subscribe(function (questions) { return _this.questions = questions; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.getContent = function (question) {
        var content = question.answer ? question.answer.content : '';
        return content;
    };
    AppComponent.prototype.switchAnswer = function (question) {
        var _this = this;
        if (!question.answer) {
            this._askService.getAnswer(question.number, this.userQuestion)
                .subscribe(function (answer) { return question.answer = answer; }, function (error) { return _this.errorMessage = error; });
        }
        question.isActive = !question.isActive;
        if (!question.isActive)
            question.isCommentActive = false;
    };
    AppComponent.prototype.getQuestionClass = function (question) {
        return question.isActive ? AppComponent_1.ACTIVE_QUESTION_CLASS : AppComponent_1.DEACTIVE_QUESTION_CLASS;
    };
    AppComponent.prototype.getAnswerClass = function (question) {
        return question.isActive ? AppComponent_1.DISPLAY_ANSWER_CLASS : AppComponent_1.HIDE_ANSWER_CLASS;
    };
    AppComponent.prototype.getLabelAnwerLink = function (question) {
        return question.isActive ? AppComponent_1.LABEL_ANSWER_HIDE : AppComponent_1.LABEL_ANSWER_VIEW;
    };
    AppComponent.prototype.getLabelCommnetLink = function (question) {
        return question.isCommentActive ? AppComponent_1.LABEL_COMMENT_HIDE : AppComponent_1.LABEL_COMMENT_VIEW;
    };
    AppComponent.prototype.switchComment = function (question) {
        this.commentFormComments = '';
        question.isCommentActive = !question.isCommentActive;
        question.isCommentSentFailed = false;
    };
    AppComponent.prototype.sendComment = function (question) {
        this._askService.sendFeedBack(question.answer.questionId, this.commentFormName, this.commentFormEmail, this.commentFormComments)
            .subscribe(function (data) {
            question.isCommentSent = true;
            question.isCommentSentFailed = false;
        }, function (error) {
            question.isCommentSent = false;
            question.isCommentSentFailed = true;
        });
    };
    return AppComponent;
}());
AppComponent.DEACTIVE_QUESTION_CLASS = 'iquestion-wrapper';
AppComponent.ACTIVE_QUESTION_CLASS = 'iquestion-wrapper is-active';
AppComponent.DISPLAY_ANSWER_CLASS = 'iquestion_answer-animation';
AppComponent.HIDE_ANSWER_CLASS = 'iquestion_answer';
AppComponent.LABEL_ANSWER_VIEW = 'View the answer →';
AppComponent.LABEL_ANSWER_HIDE = 'Hide Answer';
AppComponent.LABEL_COMMENT_VIEW = 'Comment';
AppComponent.LABEL_COMMENT_HIDE = 'Close Comment';
AppComponent = AppComponent_1 = __decorate([
    core_1.Component({
        selector: 'pm-app',
        templateUrl: 'app/questions.component.html',
        providers: [ask_service_1.AskService]
    }),
    __metadata("design:paramtypes", [ask_service_1.AskService])
], AppComponent);
exports.AppComponent = AppComponent;
var AppComponent_1;
//# sourceMappingURL=app.component.js.map
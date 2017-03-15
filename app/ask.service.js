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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var AskService = AskService_1 = (function () {
    function AskService(_http) {
        this._http = _http;
        this._askUrl = 'http://' + AskService_1.SERVER + '/rest/question/ask?question=';
        this._anwerUrl = 'http://' + AskService_1.SERVER + '/rest/answer/detail?id=';
        this._feedBackUrl = 'http://' + AskService_1.SERVER + '/rest/question/feedback';
    }
    AskService.prototype.ask = function (keyword) {
        return this._http.get(this._askUrl + keyword)
            .map(function (response) { return response.json().questions; })
            .catch(this.handleError);
    };
    AskService.prototype.getAnswer = function (id, search) {
        return this._http.get(this._anwerUrl + id + "&search=" + search)
            .map(function (response) { return response.json().answer; })
            .catch(this.handleError);
    };
    AskService.prototype.sendFeedBack = function (questionId, name, email, comments) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers, method: "post" });
        var data = new http_1.URLSearchParams();
        data.set('questionId', questionId.toString());
        data.set('name', name.toString());
        data.set('email', email.toString());
        data.set('comments', comments.toString());
        return this._http.post(this._feedBackUrl, data, options)
            .catch(this.handleError);
    };
    AskService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.message || 'Server error');
    };
    return AskService;
}());
//private static SERVER = "localhost:8080/mythidb";
AskService.SERVER = "mythidb-askalien.rhcloud.com";
AskService = AskService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AskService);
exports.AskService = AskService;
var AskService_1;
//# sourceMappingURL=ask.service.js.map
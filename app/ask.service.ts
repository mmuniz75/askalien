import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IQuestion } from './question';
import { IAnswer } from './answer';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AskService {

  private static SERVER = "localhost:8080/mythidb";
  //private static SERVER = "mythidb-askalien.rhcloud.com";

  private _askUrl = 'http://' + AskService.SERVER + '/rest/question/ask?question=';
  private _anwerUrl = 'http://' + AskService.SERVER + '/rest/answer/detail?id=';
    
  constructor(private _http: Http) { }

  ask(keyword:String) : Observable<IQuestion[]>{
    
     return this._http.get(this._askUrl + keyword)
        .map((response: Response) => <IQuestion[]> response.json().questions)
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }


  getAnswer(id: Number,search:String) : Observable<IAnswer> {
        return this._http.get(this._anwerUrl + id + "&search=" + search)
        .map((response: Response) => <IAnswer> response.json().answer)
        //.do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

 private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
 }

}  
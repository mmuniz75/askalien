import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IQuestion } from './question';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AskService {
  //private _askUrl = 'http://localhost:8080/mythidb/rest/question/ask?question=';
  private _askUrl = 'http://mythidb-askalien.rhcloud.com/rest/question/ask?question=';
  
  constructor(private _http: Http) { }

  ask(keyword:String) : Observable<IQuestion[]>{
    
     return this._http.get(this._askUrl + keyword)
        .map((response: Response) => <IQuestion[]> response.json().questions)
        .do(data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }


 private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
 }

}  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IfObservable } from 'rxjs/observable/IfObservable';
import  'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RemoteServiceProvider {

  private url: string = "https://api.coinmarketcap.com/v2/ticker/1/";

  constructor(private http: Http) {
    console.log("Hello Bitcoin");
    
  }

  getData() {
    return this.http.get(this.url)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Serve error.");
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();
  }

}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RemoteServiceProvider {
  email;

  constructor(private http: Http,private firebaseauth:AngularFireAuth) { }

  getCoins() {
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=1')
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getEth(){
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?start=1&limit=1')
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getLtc(){
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?start=5&limit=1')
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getGlobal() {
	  return this.http.get('https://api.coinmarketcap.com/v1/global/')
	  .map(this.extractData)
	  .do(this.logResponse)
	  .catch(this.catchError)
  }

  btcWallet() {
    return this.http.get('https://spectrocoin.com/api/r/wallet')
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  private catchError(error: Response | any) {
	  console.log(error);
	  return Observable.throw(error.json().error || "Server error!");
  }
  private logResponse(res: Response) {
		console.log(res);
	}
  private extractData(res: Response){
		return res.json();
  }
  
 
}
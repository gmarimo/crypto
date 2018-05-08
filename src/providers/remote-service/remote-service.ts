import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "https://api.coinmarketcap.com/v2/ticker/1/";
@Injectable()
export class RemoteServiceProvider {

  constructor(private http: HttpClient) {
    console.log("Hello Bitcoin");
    
  }

  getData() {
    return this.http.get(API);
  }

}
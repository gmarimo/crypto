import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
//import { LoadingController } from 'ionic-angular';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import  'rxjs/add/operator/map';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { WalletsPage } from '../wallets/wallets';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';

/**
 * Generated class for the SellbtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellbtc',
  templateUrl: 'sellbtc.html',
})
export class SellbtcPage {

  @ViewChild('btcamnt') btcamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  btc: number;
  btcVal:number;
  getBtc:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  coins;
  
  constructor(private dbAuth: AngularFireAuth,private remoteserviceprovider: RemoteServiceProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    
    this.getCoins();
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getBtc = 0;
    this.commission=0;
    this.usd;
    this.btc;
    this.total=0;
    //this.btcVal = 10000;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuybtcPage');
  }

  getCoins(){
    this.remoteserviceprovider.getCoins().subscribe((data) => {
      this.coins = data;
  });
}

ba(){
  
var cd = (JSON.stringify(this.coins[0]["price_usd"]));
var latprice = JSON.parse(cd);
return latprice *1.5;
}

  numBtc(){
    var numbtc:number = this.usdamnt.value/this.ba();
    this.btc = numbtc;
    this.commission = this.calcCommission(numbtc);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getBtc = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.btcamnt.value *this.ba(); 
    this.usd = amnt;
    this.commission = (this.calcCommission(amnt))/this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getBtc = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(btc:number){
    var com:number = btc*this.commissionRate;
    return com;
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.ba();
    return get;
  }
  
  makeTransaction(){
  

    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Completing deposit process...",
      duration: 3000
    });
    loader.present();

    const date:Date = new Date();
   // alert(''+date);
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy BTC').child(''+date);
    ref.set({
          USD:this.usd,
          BTC:this.btc,
          COMMISSION:this.commission,
          GET_BTC:this.getBtc,
          TOTAL:this.payamnt,
    })
    
  }
  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }

  emptyonsubmit(){
    this.usdamnt.value=null;
    this.btcamnt.value=null;
    this.payamnt=0;
    this.commission=0;
    this.getBtc=0;
    
  }
}
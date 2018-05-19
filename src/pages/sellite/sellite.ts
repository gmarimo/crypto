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

/**
 * Generated class for the SellitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellite',
  templateUrl: 'sellite.html',
})
export class SellitePage {

  @ViewChild('liteamnt') liteamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  lite: number;
  liteVal:number;
  getLite:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  
  constructor(private dbAuth: AngularFireAuth,public alertctrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getLite = 0;
    this.commission=0;
    this.usd;
    this.lite;
    this.total=0;
    this.liteVal = 10000;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellitePage');
  }

  numLite(){
    var numlite:number = this.usdamnt.value/this.liteVal;
    this.lite = numlite;
    this.commission = this.calcCommission(numlite);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getLite = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.liteamnt.value *this.liteVal; 
    this.usd = amnt;
    this.commission = (this.calcCommission(amnt))/this.liteVal;
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getLite = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(lite:number){
    var com:number = lite*this.commissionRate;
    return com;
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.liteVal;
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
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy LITE').child(''+date);
    ref.set({
          USD:this.usd,
          LITE:this.lite,
          COMMISSION:this.commission,
          GET_LITE:this.getLite,
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
    this.liteamnt.value=null;
    this.payamnt=0;
    this.commission=0;
    this.getLite=0;
    
  }
  alert(){
    let alert = this.alertctrl.create({
  
      title: "LiteCoin",
      subTitle: "LiteCoin is coming soon!!",
      buttons: ['ok']
  
    });
    alert.present();
  }

}
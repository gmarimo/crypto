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
 * Generated class for the SellethPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selleth',
  templateUrl: 'selleth.html',
})
export class SellethPage {

  @ViewChild('ethamnt') ethamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  eth: number;
  ethVal:number;
  getEth:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  
  constructor(private dbAuth: AngularFireAuth, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    this.payamnt = 0;
    this.commissionRate = 0.08;
    this.getEth = 0;
    this.commission=0;
    this.usd;
    this.eth;
    this.total=0;
    this.ethVal = 1200;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyethPage');
  }

  numEth(){
    var numeth:number = this.usdamnt.value/this.ethVal;
    this.eth = numeth;
    this.commission = this.calcCommission(numeth);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getEth = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.ethamnt.value *this.ethVal; 
    this.usd = amnt;
    this.commission = (this.calcCommission(amnt))/this.ethVal;
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getEth = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(eth:number){
    var com:number = eth*this.commissionRate;
    return com;
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.ethVal;
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
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy ETH').child(''+date);
    ref.set({
          USD:this.usd,
          ETH:this.eth,
          COMMISSION:this.commission,
          GET_BTC:this.getEth,
          TOTAL:this.payamnt,
    })
  }
  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }
}
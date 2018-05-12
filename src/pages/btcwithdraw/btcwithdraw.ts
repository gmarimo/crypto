import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Buydetails } from '../../models/buydetails';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the BtcwithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btcwithdraw',
  templateUrl: 'btcwithdraw.html',
})
export class BtcwithdrawPage {



  @ViewChild('wamnt') wamnt;
  @ViewChild('comm') comm;
  @ViewChild('totalbtc') totalbtc;

  withd: number;
  commsale;
  total;
  commissionRate: number;
  btcVal: number;
 
  withdrawbtc = {} as Buydetails; //firebase models

  constructor(private afAuth: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertctrl:AlertController) {
      
      //this.withd = 0;
      this.commsale = 0.00;
      this.total = 0.00;
      this.commissionRate = 0.01;   
      //this.btcVal = this.wamnt * this.commissionRate;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcwithdrawPage');
  }

  withdrawcal(){

    this.btcVal = this.wamnt.value * this.commissionRate; //calculating commision
    this.commsale = this.btcVal; //displaying commission
    var caltot: number = this.wamnt.value - this.btcVal;
    this.total = caltot;

  }


  btcwithdraw() {

    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Completing deposit process...",
      duration: 3000
    });
    loader.present();
    
      this.afAuth.authState.subscribe(auth => {
      this.fdb.list(`${auth.uid}/Withdraw BTC`).push(this.withdrawbtc)
    })
  }









}

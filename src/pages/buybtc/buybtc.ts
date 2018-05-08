import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
//import { WalletsPage } from '../wallets/wallets';

/**
 * Generated class for the BuybtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buybtc',
  templateUrl: 'buybtc.html',
})
export class BuybtcPage {

  buydetails = {} as Buydetails;
  //usdamount;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, public loadingCtrl: LoadingController, public alertctrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuybtcPage');
  }

  buybtcf() {

    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading ...",
      duration: 3000
    });
    loader.present();
    
      this.afAuth.authState.subscribe(auth => {
      this.fdb.list(`Buybtc/${auth.uid}`).push(this.buydetails)
      this.navCtrl.push(BtcbuysuccessPage);
      
      //this.fdb.list(`buybtc/${auth.uid}`).push(this.buydetails)
       //   .then(() => this.navCtrl.push('MybtcwalletPage'));
    })
  }

}

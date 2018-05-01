import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BtcdepositPage } from '../btcdeposit/btcdeposit';
import { BtcwithdrawPage } from '../btcwithdraw/btcwithdraw';

/**
 * Generated class for the MybtcwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mybtcwallet',
  templateUrl: 'mybtcwallet.html',
})
export class MybtcwalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybtcwalletPage');
  }

  depositbtc() {
    this.navCtrl.push(BtcdepositPage);
  }

  withdrawbtc() {
    this.navCtrl.push(BtcwithdrawPage);
  }

}

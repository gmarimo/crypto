import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EthdepositPage } from '../ethdeposit/ethdeposit';
import { EthwithdrawPage } from '../ethwithdraw/ethwithdraw';

/**
 * Generated class for the MyethwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myethwallet',
  templateUrl: 'myethwallet.html',
})
export class MyethwalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyethwalletPage');
  }

  depositeth() {
    this.navCtrl.push(EthdepositPage);
  }

  withdraweth() {
    this.navCtrl.push(EthwithdrawPage);
  }

}

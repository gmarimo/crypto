import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepositPage } from '../deposit/deposit';
import { WithdrawPage } from '../withdraw/withdraw';

/**
 * Generated class for the MyusdwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myusdwallet',
  templateUrl: 'myusdwallet.html',
})
export class MyusdwalletPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyusdwalletPage');
  }

  depositusd() {
    this.navCtrl.push(DepositPage);
  }

  withdrawusd() {
    this.navCtrl.push(WithdrawPage);
  }

}

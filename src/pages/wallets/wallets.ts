import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { BuybtcPage } from '../buybtc/buybtc';
import { BuyethPage } from '../buyeth/buyeth';
import { DepositPage } from '../deposit/deposit';
import { SellbtcPage } from '../sellbtc/sellbtc';
import { SellethPage } from '../selleth/selleth';
import { WithdrawPage } from '../withdraw/withdraw';
import { MybtcwalletPage } from '../mybtcwallet/mybtcwallet';
import { MyusdwalletPage } from '../myusdwallet/myusdwallet';
import { MyethwalletPage } from '../myethwallet/myethwallet';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

/**
 * Generated class for the WalletsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  

  RemoteserviceProvider: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
  }

  refresherPrices(refresher): void {
    this.RemoteserviceProvider.fetchPrices(refresher);
  }

  buyingbtc(){
    this.navCtrl.push(BuybtcPage);
  }

  buyingeth(){
    this.navCtrl.push(BuyethPage);
  }

  sellingbtc(){
    this.navCtrl.push(SellbtcPage);
  }

  sellingeth(){
    this.navCtrl.push(SellethPage);
  }

  depositusd(){
    this.navCtrl.push(DepositPage);
  }

  withdrawusd(){
    this.navCtrl.push(WithdrawPage);
  }

  btcwallet(){
    this.navCtrl.push(MybtcwalletPage);
  }

  ethwallet(){
    this.navCtrl.push(MyethwalletPage);
  }

  usdwallet(){
    this.navCtrl.push(MyusdwalletPage);
  }

}

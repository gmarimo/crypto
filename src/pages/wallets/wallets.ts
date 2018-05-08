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
import  'rxjs/add/operator/map';
//import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Http } from '@angular/http';

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

  gettingData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
    this.http.get('https://api.coinmarketcap.com/v2/ticker/1/')
    .map(res => res.json())
    .subscribe(res => {
      this.gettingData = res.results;

    }, (err) => {
      alert('Can not fetch price');
    });
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
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

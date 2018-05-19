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
//import { Http } from '@angular/http';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { SellitePage } from '../sellite/sellite';
import { MylitewalletPage } from '../mylitewallet/mylitewallet';
import { BuylitePage } from '../buylite/buylite';

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
  accbal:number;
  priceList = [];

  
  constructor(private afAuth: AngularFireAuth, private fdb: AngularFireDatabase,private remoteserviceprovider: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.accbal = 0;
    this.getData();
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletsPage');
    //this.getBal();
  }
  
  getData () {
    this.remoteserviceprovider.getData().subscribe(data => {
      this.priceList = data,
      this.priceList = Array.of(this.priceList);},);

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
    //this.navCtrl.push(MyusdwalletPage);
    this.accbal = 20;
    alert(23);
  }
  getBal(){
    //var bal:Date;
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('USD Balance').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        return snapshot;
      }
  }).then((snapshot) => {
    let Catdata = Object.keys(snapshot.val());
    let temparr = [];
    let datearr: Date[]=[];

    var datt:Date;
    for (var key:number=0;key<Catdata.length;key++) {
        //temparr.push(Catdata[key]);
        temparr[key]=Catdata[key]
        datearr[key] = new Date(temparr[key]);
        datt = datearr[key]; 
    }  
    return this.getCurrentUsdBal(datt);
  });
  }
  getCurrentUsdBal(date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.accbal= bal;
      }
    )
    return bal;
  }
  crtUsr(){
    var re = "@";
    var str = this.afAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  } 

  buyinglite(){
    this.navCtrl.push(BuylitePage);
  }
  
  sellinglite(){
    this.navCtrl.push(SellitePage);
  }
  litewallet(){
    this.navCtrl.push(MylitewalletPage)
  }


}

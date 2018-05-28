import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
//import { LoadingController } from 'ionic-angular';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import  'rxjs/add/operator/map';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { WalletsPage } from '../wallets/wallets';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';

/**
 * Generated class for the SellbtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellbtc',
  templateUrl: 'sellbtc.html',
})
export class SellbtcPage {

  @ViewChild('btcamnt') btcamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  btc: number;
  btcVal:number;
  getBtc:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  coins;
  
  constructor(private dbAuth: AngularFireAuth,private remoteserviceprovider: RemoteServiceProvider, 
    public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,
    private fdb:AngularFireDatabase,private toastCtrl:ToastController, public alertctrl:AlertController) {
    
    this.getCoins();
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getBtc = 0;
    this.commission=0;
    this.usd;
    this.btc;
    this.total=0;
    //this.btcVal = 10000;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuybtcPage');
  }

  getCoins(){
    this.remoteserviceprovider.getCoins().subscribe((data) => {
      this.coins = data;
  });
}

ba(){
  
var cd = (JSON.stringify(this.coins[0]["price_usd"]));
var latprice = JSON.parse(cd);
return latprice *1.5;
}

  numBtc(){
    var numbtc:number = this.usdamnt.value/this.ba();
    this.btc = parseFloat(numbtc.toFixed(5));
    this.commission = this.calcCommission(numbtc);
    this.payamnt = this.usdamnt.value - (this.usdamnt.value *this.commissionRate);
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getBtc = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.btcamnt.value *this.ba(); 
    this.usd = parseFloat(amnt.toFixed(2));
    this.commission = (this.calcCommission(amnt))/this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.payamnt = amnt - commissionUsd;
    this.getBtc = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(btc:number){
    var com:number = btc*this.commissionRate;
    return parseFloat(com.toFixed(4));
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.ba();
    return parseFloat(get.toFixed(4));
  }
  
  makeTransaction(btcbal:number,usdBal:number){
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
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Sell BTC').child(''+date);
    ref.set({
          USD:this.usd,
          BTC:this.btc,
          COMMISSION:this.commission,
          GET_BTC:this.getBtc,
          TOTAL:this.payamnt,
    })
    if(this.btc < btcbal){
    var newBal:number = usdBal + this.payamnt;
    this.loader();
    
        var btcbal = btcbal - this.btc;
        var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').child(''+date);
        ref1.set({
              Bit_Coins:btcbal,
        })
  
        var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
        ref.set({
              USD:newBal,
        })
      .catch(error => { 
  
          let toast = this.toastCtrl.create({
          message: 'There is a problem completing your transaction, please try again' ,
          duration:5000,
          cssClass: "toastclr" 
        });
  
        //////////////////////////
        toast.present();          
          });
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'You cannot sell BTC that are above your float' ,
            duration:5000,
            cssClass: "toastclr"
      
          });
          toast.present();   
        }
    
  }
  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }

  emptyonsubmit(){
    this.usdamnt.value=null;
    this.btcamnt.value=null;
    this.payamnt=0;
    this.commission=0;
    this.getBtc=0;
  }

  ////// get Usd balance
  getBal(){
    var bal:Date;
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('USD Balance').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
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
    var maxDate=new Date(Math.max.apply(null,datearr));
    return this.getCurrentUsdBal(maxDate);
  });
  }

  getCurrentUsdBal(date:Date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var usdbal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      usdbal = +strbal
      this.getBtcBal(usdbal);
      }
    )
    return usdbal;
  }


  getBtcBal(usdBal:number){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
      }
  }).then((snapshot) => {
    let Catdata = Object.keys(snapshot.val());
    let temparr = [];
    let datearr: Date[]=[];
  
    var datt:Date;
    for (var key:number=0;key<Catdata.length;key++) {
        temparr[key]=Catdata[key]
        datearr[key] = new Date(temparr[key]);
        datt = datearr[key]; 
    }  
    var maxDate=new Date(Math.max.apply(null,datearr));
    return this.getCurrentBTCBal(maxDate,usdBal);
  });
  }
  getCurrentBTCBal(date:Date,usdBal){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var btcbal:number;
    var url = '/UserID/'+newstr+'/Bit Coin/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      btcbal = +strbal
      this.makeTransaction(btcbal,usdBal);
      }
    )
    return btcbal;
  }
  public loader(){
    if(this.usdamnt.value!=''&& this.btcamnt.value!=''){
      let loader = this.loadingCtrl.create({
 
        spinner:"bubbles",
        content:"Completing your transaction ..",
        duration:5000 
      }); 
      loader.onDidDismiss(() => {
       //console.log('Dismissed loading');
        let alert = this.alertctrl.create({  
          title: "Transaction Status",
          subTitle: "Completed successfully!",
          buttons: [

            {
              text: 'ok',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'View History',
              handler: () => {
                //console.log('Buy clicked');
                this.navCtrl.push(BtcbuysuccessPage);
              }
            }



          ] 
        });
        alert.present();       
     });  
     loader.present()
  }
 }

}
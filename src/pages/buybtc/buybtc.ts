import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import { empty } from 'rxjs/Observer';
import  'rxjs/add/operator/map';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';

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
  btcprice;
  uptprice;
  latprice:number;
  coins;
  
  
  
  constructor(private toastCtrl:ToastController, private remoteserviceprovider: RemoteServiceProvider, public alertctrl: AlertController, private dbAuth: AngularFireAuth, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    this.getCoins();
    this.payamnt = 0;
    this.commissionRate = 0;
    this.getBtc = 0;
    this.commission=0;
    this.usd;
    this.btc;
    this.total=0;
    this.latprice;
    //this.btcVal = this.latprice;

    
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

    var numbtc:number = this.usdamnt.value / this.ba();
    this.btc = parseFloat(numbtc.toFixed(5));
    this.commission = this.calcCommission(numbtc);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getBtc = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.btcamnt.value * this.ba(); 
    //var amnbal = 
    this.usd =  parseFloat(amnt.toFixed(2));
    this.commission = (this.calcCommission(amnt)) /this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getBtc = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(btc:number){
    var com:number = btc * this.commissionRate;
    return parseFloat(com.toFixed(5));
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission) / this.ba();
    return parseFloat(get.toFixed(4));
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

 makeTransaction(bal:number,usdBal:number){
    const date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");

if(this.usdamnt.value==''||this.btcamnt.value==''){
  let toast = this.toastCtrl.create({
    message: 'Please enter Amount in USD OR in BTC',
    duration: 5000
  });
  toast.present(); 
}else if(this.usdamnt.value < 20){

  let toast = this.toastCtrl.create({
    message: 'You can only buy a minimum of $20 worth of BTC.',
    duration: 5000
  });
  toast.present(); 

}else{
  
  const date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  if(usdBal >= this.usdamnt.value){
  var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy BTC').child(''+date);
  ref.set({
        USD_BEFORE_COMMISSION:this.usd,
        BTC_BEFORE_COMMISSION:this.btc,
        COMMISSION:this.commission,
        BTC_AFTER_COMMISSION:this.getBtc,
        USD_AFTER_COMMISSION:this.payamnt,
  })
  var newBal:number = usdBal - this.usdamnt.value;
  this.loader();
  
      var btcbal = bal + this.getBtc;
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
          message: 'You have insufficient funds to purchase this amount of BTC.' ,
          duration:5000,
          cssClass: "toastclr"
    
        });
        toast.present();   
      }
      }
    this.emptyonsubmit();
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
    //alert(maxDate);
    return this.getCurrentUsdBal(maxDate);
  });
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
    var bal:number;
    var url = '/UserID/'+newstr+'/Bit Coin/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.makeTransaction(bal,usdBal);
      
      }
    )
    return bal;
  }
  getCurrentUsdBal(date:Date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      //alert(bal)
      this.getBtcBal(bal);
      }
    )
    return bal;
  }
}
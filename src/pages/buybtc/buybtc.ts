import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
//import { LoadingController } from 'ionic-angular';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import { empty } from 'rxjs/Observer';
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
  
  constructor(private toastCtrl:ToastController, public alertctrl: AlertController, private dbAuth: AngularFireAuth, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getBtc = 0;
    this.commission=0;
    this.usd;
    this.btc;
    this.total=0;
    this.btcVal = 10000;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuybtcPage');
  }

  

  numBtc(){
    var numbtc:number = this.usdamnt.value/this.btcVal;
    this.btc = numbtc;
    this.commission = this.calcCommission(numbtc);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getBtc = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.btcamnt.value *this.btcVal; 
    this.usd = amnt;
    this.commission = (this.calcCommission(amnt))/this.btcVal;
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getBtc = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(btc:number){
    var com:number = btc*this.commissionRate;
    return com;
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.btcVal;
    return get;
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
  
  makeTransaction(bal:number){
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
}
else{
  
  const date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  if(bal >= this.usdamnt.value){
  var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy BTC').child(''+date);
  ref.set({
        USD:this.usd,
        BTC:this.btc,
        COMMISSION:this.commission,
        GET_BTC:this.getBtc,
        TOTAL:this.payamnt,
  })
  var newBal:number = bal - this.usdamnt.value;
  this.loader();
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
      toast.present();          
        });
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'You have insufficient funds to make a deposit' ,
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
      this.makeTransaction(bal);
      }
    )
    return bal;
  }
}


     
     /* }
      else
       {
        let toast = this.toastCtrl.create({
          message: 'You have insufficient funds to make a deposit' ,
          duration:5000,
          cssClass: "toastclr"
    
        });
        toast.present();   
       }
    this.emptyonsubmit();
      }*/
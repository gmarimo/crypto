import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

import { Buydetails } from '../../models/buydetails';
import { AlertController } from 'ionic-angular';
import { LoadingController ,ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the BtcwithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btcwithdraw',
  templateUrl: 'btcwithdraw.html',
})
export class BtcwithdrawPage {



  @ViewChild('wamnt') wamnt;
  @ViewChild('comm') comm;
  @ViewChild('totalbtc') totalbtc;
  @ViewChild('walletaddress') walletaddress;

  withd: number;
  commsale;
  total;
  commissionRate: number;
  btcVal: number;
  btcbal;
 
  withdrawbtc = {} as Buydetails; //firebase models

  constructor(private toastCtrl:ToastController,private afAuth: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertctrl:AlertController) {
    this.wamnt = 0;
    this.comm = 0;
    this.totalbtc =0
    this.btcbal = 0.00;
      this.commsale = 0.00;
      this.total = 0.00;
      this.commissionRate = 0.01;   
      this.getBtcBal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcwithdrawPage');
  }

  withdrawcal(){

    this.btcVal = this.wamnt.value * this.commissionRate; //calculating commision
    this.commsale = this.btcVal; //displaying commission
    var caltot: number = this.wamnt.value - this.btcVal;
    this.total = caltot;

  }


  btcwithdraw(btcbal:number)
  {
    const date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");

if(this.wamnt.value==''){
  let toast = this.toastCtrl.create({
    message: 'Please enter Amount in USD OR in BTC',
    duration: 5000
  });
  toast.present(); 
}
else if(this.walletaddress.value == ''){
  let toast = this.toastCtrl.create({
    message: 'Please enter BTC wallet address to send funds to.',
    duration: 5000
  });
  toast.present();
}else{
  const date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  if(btcbal >= this.wamnt.value){
  this.fdb.database.ref('UserID').child(newstr).child('BTC Withdrawal').child(''+date).
  ref.set({
        BTC_AMOUNT_BEFORE_FEES:this.wamnt.value,
        BTC_AMOUNT_AFTER_FEES:this.totalbtc.value,
        BTC_WALLET_ADDRESS:this.walletaddress.value,
        COMMISSION:this.comm.value,
  })
  var newBal:number = btcbal - this.wamnt.value;
  this.loader();
  
      var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').child(''+date);
      ref1.set({
            Bit_Coins:newBal,
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
          message: 'You have insufficient BTC to withdraw this amount of BTC.' ,
          duration:5000,
          cssClass: "toastclr"
    
        });
        toast.present();   
      }
}
    this.emptyonsubmit();
  }
  emptyonsubmit(){
    this.wamnt.value=null;
    this.comm.value=0;
    this.totalbtc.value=0;
    this.walletaddress.value=null;
  }
  public loader(){
    if(this.wamnt.value!=''){
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
              //text: 'View History',
              handler: () => {
                //console.log('Buy clicked');
                //this.navCtrl.push(BtcbuysuccessPage);
              }
            }
          ] 
        });
        alert.present();       
     });  
     loader.present()
  }
 }




  ////////display btc bal to html
  getBtcBal(){
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
    return this.getCurrentBTCBal(maxDate);
  });
  }
  crtUsr(){
    var re = "@";
    var str = this.afAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }
  getCurrentBTCBal(date:Date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/Bit Coin/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.btcbal = bal;
      }
    )
    return bal;
  }
  mkWithdrwal(){
    this.btcwithdraw(this.btcbal);
  }
}

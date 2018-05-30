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
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { WalletsPage } from '../wallets/wallets';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';


/**
 * Generated class for the BuylitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buylite',
  templateUrl: 'buylite.html',
})
export class BuylitePage {

  @ViewChild('liteamnt') liteamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  lite:number;
  liteVal:number;
  getLite:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  ltc;
  
  constructor(private toastCtrl:ToastController,private remoteserviceprovider: RemoteServiceProvider,public alertctrl:AlertController, private dbAuth: AngularFireAuth, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {

    this.getLtc()
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getLite = 0;
    this.commission=0;
    this.usd;
    this.lite;
    this.total=0;
    //this.liteVal = 10000;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuylitePage');
  }

  getLtc(){
    this.remoteserviceprovider.getLtc().subscribe(data => {
      this.ltc = data;
      //alert(JSON.stringify(this.ltc[0]["price_usd"]))
  });
}

ba(){
  
var cd = (JSON.stringify(this.ltc[0]["price_usd"]));
var latprice = JSON.parse(cd);
return latprice *1.5;
}



  numLite(){
    var numlite:number = this.usdamnt.value/this.ba();
    this.lite = parseFloat(numlite.toFixed(5));
    this.commission = this.calcCommission(numlite);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getLite = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.liteamnt.value *this.ba(); 
    this.usd = parseFloat(amnt.toFixed(2));
    this.commission = (this.calcCommission(amnt))/this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getLite = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(lite:number){
    var com:number = lite*this.commissionRate;
    return parseFloat(com.toFixed(4))
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.ba();
    return parseFloat(get.toFixed(4));
  }

  public loader(){
    if(this.usdamnt.value!=''&& this.liteamnt.value!=''){
      let loader = this.loadingCtrl.create({
 
        spinner:"bubbles",
        content:"Completing your transaction ..",
        duration:5000
 
      });
 
      loader.onDidDismiss(() => {
       console.log('Dismissed loading');
     });  
     loader.present()
  }
 }
  
  makeTransaction(){
    this.loader();
    const date:Date = new Date();
   // alert(''+date);
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy LITE').child(''+date);
    ref.set({
          USD:this.usd,
          LITE:this.lite,
          COMMISSION:this.commission,
          GET_LITE:this.getLite,
          TOTAL:this.payamnt,
    })
if(this.usdamnt.value==''||this.liteamnt.value==''){
  let toast = this.toastCtrl.create({
    message: 'Enter Amount in USD OR in L.Coin',
    duration: 3000
  });
  toast.present(); 
}
else{
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
  
  var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy LITE').child(''+date);
  ref.set({
        USD:this.usd,
        LITE:this.lite,
        COMMISSION:this.commission,
        GET_LITE:this.getLite,
        TOTAL:this.payamnt,
  })


    .catch(error => { 

      let toast = this.toastCtrl.create({
        message: 'Email or password invalid, please verify your details and try again.' ,
        duration:5000,
        cssClass: "toastclr"
  
      });
      toast.present();          
        });}

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
    this.liteamnt.value=null;
    this.payamnt=0;
    this.commission=0;
    this.getLite=0;
    
  }
  alert(){
  let alert = this.alertctrl.create({

    title: "LiteCoin",
    subTitle: "LiteCoin is coming soon!!",
    buttons: ['ok']

  });
  alert.present();
  
}

}

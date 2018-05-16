import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { Buydetails } from '../../models/buydetails';
import { LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  ListCategory = [];
  temparrCat= [];

  @ViewChild('amount') amount;

  constructor(private dbAuth: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertctrl:AlertController) {
  this.amount = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }
  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  } 
  depositBal(){
    const date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
    ref.set({
          USD:this.amount.value
    })
  }  
  getBal(){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('USD Balance').once('value', function(snapshot) {
      if (snapshot.val() !== null) {

         // var tableNames = Object.keys(snapshot.val());
          //alert(tableNames); // ["answers", "blocks", "chats", "classes"]
          let Catdata = Object.keys(snapshot.val());
          let temparr = [];
          let datearr: Date[]=[];

          var datt:Date;
          for (var key:number=0;key<Catdata.length;key++) {
              //temparr.push(Catdata[key]);
              temparr[key]=Catdata[key]
              datearr[key] = new Date(temparr[key]);
          }
          var maxDate=new Date(Math.max.apply(null,datearr));
          alert(maxDate);
      }
  });
  }
 /* getBal(){
    this.getAllCatList().then((res: any) => {
      this.ListCategory = res;
      this.temparrCat = res;
      alert(this.temparrCat);
  })
  }
  getAllCatList() {
    var promise = new Promise((resolve, reject) => {
      var re = ".";
      var str = this.crtUsr();
      var newstr = str.replace(re,"");
        this.fdb.database.ref("UserID").orderByChild(newstr).once('value', (snapshot) => {
            let Catdata = snapshot.val();
            let temparr = [];
            for (var key in Catdata) {
                temparr.push(Catdata[key]);
            }
            resolve(temparr);
        }).catch((err) => {
            reject(err);
        })
    })
    return promise;
}
  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }  */
  /*pymntinfo() {

    let alert = this.alertctrl.create({

      title: "Redirecting to Paynow",
      subTitle: "You are being redirected to Paynow to complete your deposit. Please check your email after payment, copy the payment ID and paste it in 'Payment ID' field to complete your INSTANT DEPOSIT!!",
      buttons: [{
        text: "Proceed",
        handler: () => {
          window.open('https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPW1naWZ0OTMxOSU0MGdtYWlsLmNvbSZhbW91bnQ9MC4wMCZyZWZlcmVuY2U9Jmw9MA%3d%3d');
        }
      }],
      
    });
    alert.present();

  }

  complete() {

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

    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Deposit').child(''+date);
    ref.set({
          Paynow_Reference:this.paynowReference,
    })
    
  }

  crtUsr(){
    var re = "@";
    var str = this.afAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }*/
}

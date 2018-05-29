import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import {BtcwithdrawPage} from '../btcwithdraw/btcwithdraw';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the BtcbuysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btcbuysuccess',
  templateUrl: 'btcbuysuccess.html',
})
export class BtcbuysuccessPage {
  items;
  valuu:number;
  dates;
  btcs;
   Catdata =[];
  constructor(public dp: DatePipe,public fdb: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.updatebalToHtml()
    this.updatebal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcbuysuccessPage');
  }
  crtUsr(){
    var re = "@";
    var str = this.afAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  } 
  withdrawbtc() {
    this.navCtrl.push(BtcwithdrawPage);
  }
  updatebal(){ 
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        return snapshot;
      }
  }).then((snapshot) => {
     let Catdata = Object.keys(snapshot.val());
    let temparr = [];
    let datearr: Date[]=[];
    var datt:Date;
  
    this.DatesFormat(Catdata);
  });
  }

setBal(date){
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  for(var i =0;i<date.length;i++){
  var url = '/UserID/'+newstr+'/Bit Coin/'+date[i];
  this.fdb.list(url).valueChanges().subscribe(
    data => {
      this.Catdata.push(data);
    }
  )
}
this.btcs = this.Catdata;
}
hello(){
  alert('Hello, world');
}
DatesFormat(Dates:string[]){
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  var bal:number;
  let latest_date=[];
  let getBtc = [];
  for(var i=0;i<Dates.length;i++){
    latest_date[i] =this.dp.transform(Dates[i], 'dd-MM-yyyy | HH:mm');
    getBtc[i] = Dates[i];
   }
   this.setBal(getBtc);
  this.dates = latest_date;
}
///// pass value to html

updatebalToHtml(){ 
  var bal:Date;
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').once('value', function(snapshot) {
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
  return this.setBalToHtml(datt);
});
}
setBalToHtml(date:Date){
  var re = ".";
  let btcbal = [];
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  var bal:number;
  var url = '/UserID/'+newstr+'/Bit Coin/'+date;
  this.fdb.list(url).valueChanges().subscribe(
    data => {
      for(var i =0 ;i <data.length;i++){
     btcbal[i] = data[i];
     this.valuu = btcbal[i];
      }
    }
  )
  return bal;
}
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BtcwithdrawPage } from '../btcwithdraw/btcwithdraw';

/**
 * Generated class for the DeposithistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposithistory',
  templateUrl: 'deposithistory.html',
})
export class DeposithistoryPage {

  items;
  valuu;
  dates;
  btcs;
   Catdata =[];

  constructor(public dp: DatePipe,public fdb: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.updatebal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeposithistoryPage');
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
    this.fdb.database.ref('UserID').child(newstr).child('USD Deposit').once('value', function(snapshot) {
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
  var url = '/UserID/'+newstr+'/USD Deposit/'+date[i];
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

}

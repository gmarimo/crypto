import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepositPage } from '../deposit/deposit';
import { WithdrawPage } from '../withdraw/withdraw';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

/**
 * Generated class for the MyusdwalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myusdwallet',
  templateUrl: 'myusdwallet.html',
})
export class MyusdwalletPage {

  items;
  constructor(public fdb: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.updatebal()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyusdwalletPage');
  }

  depositusd() {
    this.navCtrl.push(DepositPage);
  }

  withdrawusd() {
    this.navCtrl.push(WithdrawPage);
  }
  updatebal(){ 
    var bal:Date;
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
    return this.setBal(datt);
  });
  }
setBal(date:Date){
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  var bal:number;
  var url = '/UserID/'+newstr+'/USD Balance/'+date;
  this.fdb.list(url).valueChanges().subscribe(
    data => {
    this.items = data;
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

}

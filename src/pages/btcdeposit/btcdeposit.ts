import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-btcdeposit',
  templateUrl: 'btcdeposit.html',
})
export class BtcdepositPage {
items;

  constructor(public fdb: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.updatebal();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcdepositPage');
  }
  updatebal(){ 
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
    return this.setBal(datt);
  });
  }
setBal(date:Date){
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  var bal:number;
  var url = '/UserID/'+newstr+'/Bit Coin/'+date;
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

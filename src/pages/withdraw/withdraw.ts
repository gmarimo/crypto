import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  usdbal;
  bal = [];
  @ViewChild('amnt') amnt;
  @ViewChild('num') num;
  temparr = [];
  datearr:Date[] =[];
  constructor(private toastCtrl:ToastController,public fdb: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.updatebal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }

  emptyonsubmit(){
    this.amnt.value=null;
    this.num.value=null; 
  }
  //////////////////////////////////pass value to html
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
    for (var key:number=0;key<Catdata.length;key++) {
        this.temparr.push(Catdata[key]);
    }  
  });
  }
setBal(date:Date){
  alert('in setBal')
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  var url = '/UserID/'+newstr+'/USD Balance/'+date;
  this.fdb.list(url).valueChanges().subscribe(
    data => {
      for(var i = 0; i < data.length;i++){
        this.bal.push(data[i]);
        this.usdbal = this.bal[i];
        alert("nyasha"+data[i]);
      }
    }
  )
}
getMaxDate(){
  for(var key =0; key<this.temparr.length;key++){
    this.datearr.push(new Date(this.temparr[key]));
    }
  var maxDate=new Date(Math.max.apply(null,this.datearr));
  alert(maxDate);

}
makeWithdrawal(){

  var date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");

  alert(this.bal);

  if(this.amnt.value < this.usdbal){
    var newBal:number = this.usdbal - this.amnt.value;
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
  })
  }
  else{
    alert('you cannot make a deposit above your float');
  }
}
crtUsr(){
  var re = "@";
  var str = this.afAuth.auth.currentUser.email;
  var newstr = str.replace(re,"");
  return newstr;
} 
}
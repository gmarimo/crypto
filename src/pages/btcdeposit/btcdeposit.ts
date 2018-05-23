import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { ToastController, Nav } from 'ionic-angular';

/**
 * Generated class for the BtcdepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-btcdeposit',
  templateUrl: 'btcdeposit.html',
})
export class BtcdepositPage {
  @ViewChild('cpyBtn ') cpyBtn ;
 //@ViewChild('address') address;

  address:string;

  message:string="";
  file:string= null;
  link:string=null;
  subject:string=null;
  items;

 
  

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public fdb: AngularFireDatabase,public afAuth: AngularFireAuth, 
    public navParams: NavParams,private socialSharing: SocialSharing, private clipboard: Clipboard) {

      //this.copy();
      this.address="1BoatSLRHtKNngkdXEeobR76b53LET";
      //alert(this.address);
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

copy(){
  this.clipboard = new Clipboard();
  this.clipboard.copy(this.address).then(() => {
    this.showMsg(this.toastCtrl);

  }).catch(error=>{
alert(error)
  });
  
}


showMsg(toastCtrl: ToastController) {
  let toast = toastCtrl.create({
      message: 'Address copied to clipboard',
      duration: 3000,
      position: 'bottom'
  });
  toast.present();
}

share(index){
this.socialSharing.share(this.message, this.file, [this.link,this.subject]).then(() => {
  // Success!
}).catch(error=>{
  alert(error)
      });
}
}

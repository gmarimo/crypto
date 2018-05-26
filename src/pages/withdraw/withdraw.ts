import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { UsdwithdrawalPage } from '../usdwithdrawal/usdwithdrawal';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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

  @ViewChild('amnt') amnt;
  @ViewChild('num') num;
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
  btcprice;
  uptprice;
  latprice:number;
  coins;
  
  
  
  constructor(private toastCtrl:ToastController, public alertctrl: AlertController, private dbAuth: AngularFireAuth, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getBtc = 0;
    this.commission=0;
    this.usd;
    this.btc;
    this.total=0;
    this.latprice;
    //this.btcVal = this.latprice;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuybtcPage');
  }

  public loader(){
    if(this.amnt.value!=''&& this.num.value!=''){
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
                this.navCtrl.push(UsdwithdrawalPage);
              }
            }
          ] 
        });
        alert.present();       
     });  
     loader.present()
  }
 }

 makeTransaction(bal:number,usdBal:number){
    const date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");

if(this.amnt.value==''||this.num.value==''){
  let toast = this.toastCtrl.create({
    message: 'Please fill all fields',
    duration: 5000
  });
  toast.present(); 
}else if(this.amnt.value < 20){

  let toast = this.toastCtrl.create({
    message: 'You can only withdraw a minimum of $20.',
    duration: 5000
  });
  toast.present(); 

}else{
  
  const date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  if(usdBal >= this.amnt.value){
  var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Withdrawal').child(''+date);
  ref.set({
        USD_Withdrawal_amount:this.amnt,
        Ecocash_number: this.num,
      
  })
  var newBal:number = usdBal - this.amnt.value;
  this.loader();
  
      var btcbal = bal + this.getBtc;
      var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').child(''+date);
      ref1.set({
            Bit_Coins:btcbal,
      })

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

      //////////////////////////
      toast.present();          
        });
      }
      else{
        let toast = this.toastCtrl.create({
          message: 'You have insufficient funds to purchase this amount of BTC.' ,
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
    this.amnt.value=null;
    this.num.value=null;
    
  }
  getBal(){
    var bal:Date;
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.fdb.database.ref('UserID').child(newstr).child('USD Withdrawal').once('value', function(snapshot) {
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
  getBtcBal(usdBal:number){
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
        temparr[key]=Catdata[key]
        datearr[key] = new Date(temparr[key]);
        datt = datearr[key]; 
    }  
    
    return this.getCurrentBTCBal(datt,usdBal);
  });
  }
  getCurrentBTCBal(date:Date,usdBal){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.makeTransaction(bal,usdBal);
      
      }
    )
    return bal;
  }
  getCurrentUsdBal(date:Date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.getBtcBal(bal);
      }
    )
    return bal;
  }
}

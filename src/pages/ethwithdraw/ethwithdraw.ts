import { Component, ViewChild } from '@angular/core';
import { IonicPage,ToastController,AlertController,LoadingController, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EthwithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ethwithdraw',
  templateUrl: 'ethwithdraw.html',
})
export class EthwithdrawPage {
  @ViewChild('wamnt') wamnt;
  commsale;
  totaleth;
  commissionRate;
  ethaccbal;

  constructor(  public alertctrl:AlertController,public loadingCtrl: LoadingController,private toastCtrl:ToastController,private afAuth: AngularFireAuth, private fdb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.getBtcBal();
    this.ethaccbal =0;
    this.commsale = 0;
    this.commissionRate = 0.01;
    this.totaleth=0;
    this.wamnt=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EthwithdrawPage');
  }
  withdrawcal(){
    this.commsale = this.wamnt.value * this.commissionRate; //calculating commision
    //this.commsale = this.btcVal; //displaying commission
    //var caltot: number = this.wamnt.value - this.btcVal;
    this.totaleth =this.wamnt.value - this.commsale;
  }
  withdrawEth(){
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
else{
  const date:Date = new Date();
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  if(this.ethaccbal >= this.wamnt.value){
  this.fdb.database.ref('UserID').child(newstr).child('ETH Withdrawal').child(''+date).
  ref.set({
        ETH_Withdrawal_Amount:this.wamnt.value,
        COMMISSION:this.commsale,
        Total_ETH:this.totaleth
  })
  var newBal:number = this.ethaccbal - this.wamnt.value;
  this.loader();
  
      var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Ethereum').child(''+date);
      ref1.set({
            Ethereum:newBal,
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
          message: 'You have insufficient ETH to withdraw this amount of ETH.' ,
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
    this.commsale=0;
    this.totaleth=0;
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
              text: 'View History',
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
      this.fdb.database.ref('UserID').child(newstr).child('Ethereum').once('value', function(snapshot) {
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
      var url = '/UserID/'+newstr+'/Ethereum/'+date;
      this.fdb.list(url).valueChanges().subscribe(
        data => {
        var strbal:string = data.toString();
        bal = +strbal
        this.ethaccbal = bal;
        }
      )
      return bal;
    }

}

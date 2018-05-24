import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { AlertController,ToastController  } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
//import { LoadingController } from 'ionic-angular';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { WalletsPage } from '../wallets/wallets';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';
import { EthbuysuccessPage } from '../ethbuysuccess/ethbuysuccess';


/**
 * Generated class for the BuyethPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyeth',
  templateUrl: 'buyeth.html',
})
export class BuyethPage {

  @ViewChild('ethamnt') ethamnt;
  @ViewChild('usdamnt') usdamnt;
  total:number;
  usd: number;
  commissionRate:number;
  commission:number;
  ethm: number;
  ethVal:number;
  getEthm:number;
  payamnt:number;
  datastore //= firebase.database();
  listId: string;
  elClass:string;
  title: string;
  eth;
  
  
  constructor(private toastCtrl:ToastController, private remoteserviceprovider: RemoteServiceProvider,
    private dbAuth: AngularFireAuth, public alertctrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private fdb:AngularFireDatabase) {
    
    this.getEthereum();
    this.payamnt = 0;
    this.commissionRate = 0.1;
    this.getEthm = 0;
    this.commission=0;
    this.usd;
    this.ethm;
    this.total=0;
    this.ethVal;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyethPage');
  }

  getEthereum(){
    this.remoteserviceprovider.getEth().subscribe((data) => {
      this.ethm = data;
  });

}

ba(){
  
var bd = (JSON.stringify(this.ethm[0]["price_usd"]));
var lat = JSON.parse(bd);
return lat *1.5;
}


  

  numEth(){
    var numeth:number = this.usdamnt.value/this.ba();
    this.eth = numeth;
    this.commission = this.calcCommission(numeth);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getEthm= this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.ethamnt.value *this.ba(); 
    this.usd = amnt;
    this.commission = (this.calcCommission(amnt))/this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getEthm = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(eth:number){
    var com:number = eth*this.commissionRate;
    return com;
  }
  calcGet(amnt:number,commission:number){
    var get = (amnt-commission)/this.ba();
    return get;
  }

  public loader(){
    if(this.usdamnt.value!=''&& this.ethamnt.value!=''){
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
              this.navCtrl.push(EthbuysuccessPage);
            }
          }



        ] 
      });
      alert.present();    
     });  
     loader.present()
  }
 }
  
  makeTransaction(ethbal:number,usdBal:number){
    //this.loader();
    const date:Date = new Date();
   // alert(''+date);
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy ETH').child(''+date);
    //alert(" >> " + this.usd);
    ref.set({
          USD:this.usd,
          ETH:this.eth,
          COMMISSION:this.commission,
          GET_ETH:this.getEthm,
          TOTAL:this.payamnt,
    })
if(this.usdamnt.value==''||this.ethamnt.value==''){
  let toast = this.toastCtrl.create({
    message: 'Enter Amount in USD OR in ETH',
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
  if(this.usd < usdBal){
  const date:Date = new Date();
 // alert(''+date);
  var re = ".";
  var str = this.crtUsr();
  var newstr = str.replace(re,"");
  
  var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy ETH').child(''+date);
  ref.set({
        USD:this.usd,
        ETH:this.eth,
        COMMISSION:this.commission,
        GET_ETH:this.getEthm,
        TOTAL:this.payamnt,
  })


    .catch(error => { 

      let toast = this.toastCtrl.create({
        message: 'Email or password invalid, please verify your details and try again.' ,
        duration:5000,
        cssClass: "toastclr"
  
      });
      toast.present();          
        });
        var newBal:number = usdBal - this.usdamnt.value;
        this.loader();
      
            var ethtotal = ethbal + this.getEthm;
            var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Ethereum').child(''+date);
            ref1.set({
                  Ethereum:ethtotal,
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
          message: 'Insufficient credit in your account to buy Ethereum.' ,
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
    this.usdamnt.value=null;
    this.ethamnt.value=null;
    this.payamnt=0;
    this.commission=0;
    this.getEthm=0;
    
  }
  getBal(){
    var bal:Date;
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
        //temparr.push(Catdata[key]);
        temparr[key]=Catdata[key]
        datearr[key] = new Date(temparr[key]);
        datt = datearr[key]; 
    }  
    return this.getCurrentUsdBal(datt);
  });
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
      this.getEthBal(bal);
      }
    )
    return bal;
  }
  getEthBal(usdBal:number){
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
    return this.getCurrentETHBal(datt,usdBal);
  });
  }

  getCurrentETHBal(date:Date,usdBal){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/Ethereum/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      this.makeTransaction(bal,usdBal);
      }
    )
    return bal;
  }
}
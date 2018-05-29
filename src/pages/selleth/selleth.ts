import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Buydetails } from '../../models/buydetails';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController, ToastController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
//import { LoadingController } from 'ionic-angular';
import { BtcbuysuccessPage } from '../btcbuysuccess/btcbuysuccess';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
//import { WalletsPage } from '../wallets/wallets';
import { HttpModule } from '@angular/http';
import { json } from 'body-parser';


/**
 * Generated class for the SellethPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selleth',
  templateUrl: 'selleth.html',
})
export class SellethPage {

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
  
  
  constructor(private dbAuth: AngularFireAuth, private remoteserviceprovider: RemoteServiceProvider, 
    public loadingCtrl: LoadingController, public navCtrl: NavController, 
    public navParams: NavParams,private fdb:AngularFireDatabase, private toastCtrl:ToastController, public alertctrl:AlertController) {
    this.getEthereum();
    this.payamnt = 0;
    this.commissionRate = 0.03;
    this.getEthm = 0;
    this.commission=0;
    this.usd=0;
    this.ethm =0;
    this.total=0;
    this.eth=0;
    //this.ethVal = 10000;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyethPage');
  }

  getEthereum(){
    this.remoteserviceprovider.getEth().subscribe((data) => {
      this.ethm = data;
      //alert(JSON.stringify(this.eth[0]["price_usd"]))
  });
}

ba(){
  
var cd = (JSON.stringify(this.ethm[0]["price_usd"]));
var latprice = JSON.parse(cd);
return latprice *1.48;
}

  numEth(){
    var numeth:number = this.usdamnt.value/this.ba();
    this.eth = parseFloat(numeth.toFixed(5));
    this.commission = this.calcCommission(numeth);
    this.payamnt = this.usdamnt.value;
    var commissionUsd = this.usdamnt.value *this.commissionRate;
    this.getEthm = this.calcGet(this.usdamnt.value,commissionUsd);

  }
  amntUsd(){
    var amnt:number = this.ethamnt.value *this.ba(); 
    this.usd = parseFloat(amnt.toFixed(2));
    this.commission = (this.calcCommission(amnt))/this.ba();
    this.payamnt = amnt;
    var commissionUsd = amnt*this.commissionRate;
    this.getEthm = this.calcGet(amnt,commissionUsd);
  }
   calcCommission(eth:number){
    var com:number = eth*this.commissionRate;
    return parseFloat(com.toFixed(5));
  }
  calcGet(amnt:number,commission:number){
    var getEth = (amnt-commission)/this.ba();
    return parseFloat(getEth.toFixed(5));
  }
  
  makeTransaction(ethbal:number,usdBal:number){
    if(this.usdamnt.value == '' || this.ethamnt.value == ''){
      let toast = this.toastCtrl.create({
        message: 'Please enter amount in USD or ETH.' ,
        duration:5000,
        cssClass: "toastclr"
  
      });
      toast.present();
    }else if(this.usdamnt.value < 20){
      let toast = this.toastCtrl.create({
        message: 'You can only purchase a minimum of $20 worth of ETH.' ,
        duration:5000,
        cssClass: "toastclr"
  
      });
      toast.present();
    }else{

    const date:Date = new Date();
   // alert(''+date);
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('Buy ETH').child(''+date);
    ref.set({
          USD_BEFORE_FEES:this.usd,
          ETH_BEFORE_FEES:this.eth,
          FEES:this.commission,
          ETH_AFTER_FEES:this.getEthm,
          USD_AFTER_FEES:this.payamnt,
    })
    if(this.eth < ethbal){
      let loader = this.loadingCtrl.create({
        spinner: "bubbles",
        content: "Completing your transaction...",
        duration: 5000
      });
      loader.present();
      var newBal:number = usdBal + this.payamnt;
      this.loader();
      
          var ethbal = ethbal - this.eth;
          var ref1 = this.fdb.database.ref('UserID').child(newstr).child('Ethereum').child(''+date);
          ref1.set({
                Ethereum:ethbal,
          })
    
          var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
          ref.set({
                USD:newBal,
          })
        .catch(error => { 
    
            let toast = this.toastCtrl.create({
            message: 'Oops, ' + error ,
            duration:5000,
            cssClass: "toastclr" 
          });
    
          //////////////////////////
          toast.present();          
            });
          }
          else{
            let toast = this.toastCtrl.create({
              message: 'You cannot sell Eth that are above your float' ,
              duration:5000,
              cssClass: "toastclr"
        
            });
            toast.present();   
          }

          this.emptyonsubmit();
        }

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

  ////// get Usd balance
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
    var maxDate=new Date(Math.max.apply(null,datearr));
    return this.getCurrentUsdBal(maxDate);
  });
  }

  getCurrentUsdBal(date:Date){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var usdbal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      usdbal = +strbal
      this.getEthBal(usdbal);
      }
    )
    return usdbal;
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
    var maxDate=new Date(Math.max.apply(null,datearr));
    return this.getCurrentEthBal(maxDate,usdBal);
  });
  }
  
  getCurrentEthBal(date:Date,usdBal){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var ethbal:number;
    var url = '/UserID/'+newstr+'/Ethereum/'+date;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      ethbal = +strbal
      this.makeTransaction(ethbal,usdBal);
      }
    )
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
                this.navCtrl.push(BtcbuysuccessPage);
              }
            }



          ] 
        });
        alert.present();       
     });  
     loader.present()
  }
 }

}
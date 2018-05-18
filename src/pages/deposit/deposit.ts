import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { Buydetails } from '../../models/buydetails';
import { LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { DeposithistoryPage } from '../deposithistory/deposithistory';

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  ListCategory = [];
  temparrCat= [];

  @ViewChild('amount') amount;
  rtnDate1:Date;
  getMaxDate(date:string){
    alert('nyasha'+date);
  }

  constructor(private afAuth: AngularFireAuth, private fdb: AngularFireDatabase, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public alertctrl:AlertController) {
  this.amount=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }
  crtUsr(){
    var re = "@";
    var str = this.afAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  } 
  depositBal(){
    var amtDeposited:number =this.amount.value;
    const date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Deposit').child(''+date);
    ref.set({
          USD:amtDeposited
    })
    this.getBalToDeposit(amtDeposited);
  }  
  getBalToDeposit(balance:number){
    var bal:Date;
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.rtnDate1=new Date();
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
        //datt = datearr[key]; 
    }  
    var maxDate = Math.max.apply(null, datearr)
    maxDate = new Date(maxDate)
    this.getCurrentUsdBalToDeposit(maxDate,balance);
  });
  }
  getCurrentUsdBalToDeposit(names,balance){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal2:number = parseFloat(balance).valueOf();
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+names;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = parseFloat(strbal).valueOf();
      var total:number = bal2+bal;
      //alert(total);
      this.UpdateUsdBal(total);
      }
    )
    
  }
  UpdateUsdBal(amtDeposited:number){
    var date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
    ref.set({
          USD:amtDeposited
    })
  }



  //////////
  getBal(){
    var bal:Date;
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.rtnDate1=new Date();
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
  getCurrentUsdBal(names){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var bal:number;
    var url = '/UserID/'+newstr+'/USD Balance/'+names;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      bal = +strbal
      }
    )
    return bal;
  }


  //////Get Value From Deposit Balance
  updateBal(){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    this.rtnDate1=new Date();
    this.fdb.database.ref('UserID').child(newstr).child('USD Deposit').once('value', function(snapshot) {
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
    this.calcBalance(datt);
  });

  }
  calcBalance(amount){
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");

    var url = '/UserID/'+newstr+'/USD Deposit/'+amount;
    this.fdb.list(url).valueChanges().subscribe(
      data => {
      var strbal:string = data.toString();
      var bal:number = +strbal
      alert(bal+bal)
      }
    )
  }
}
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {  ToastController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Injectable} from '@angular/core';
import { WalletsPage } from '../wallets/wallets';


/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  @ViewChild('oldpass') oldpass;
  @ViewChild('newpass') newpass;
  @ViewChild('confirmpass') confirmpass;


  password;
  emaill;

  constructor(public navCtrl: NavController,public events: Events,private firebaseauth:AngularFireAuth,public alertCtrl:AlertController,
    private toastCtrl:ToastController,private fdb:AngularFireDatabase,private dbAuth: AngularFireAuth, 
    public navParams: NavParams,public afAuth: AngularFireAuth,public loadingCtrl: LoadingController) {
      
      const auth = afAuth.auth;
      const user = this.firebaseauth.auth.currentUser;
      const newPassword = this.newpass='';

      this.confirmpass='';
      this.oldpass='';

      this.emaill = this.firebaseauth.auth.currentUser.email;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  empty(){
    this.oldpass.value=null;
    this.newpass.value=null;
    this.confirmpass.value=null;

    this.alert();

  }

 alert(){
    let alert= this.alertCtrl.create({subTitle:'Password successsfully changed!',
    buttons: [{
      text: "OK",
  }],});
    alert.present();
  }

  changepassword(){
    this.changepass();
  }


  public change(){

    this.firebaseauth.auth.signInWithEmailAndPassword(this.emaill, this.oldpass.value)
    .then(data => { 
  
    let loader = this.loadingCtrl.create({
      spinner:"bubbles",
      content:"Please wait...",
      duration:3000

    });

    loader.onDidDismiss(() => {

    const auth = this.afAuth.auth;
    const user = this.firebaseauth.auth.currentUser;
    const newPassword = this.newpass.value;

    user.updatePassword(newPassword).then(function(){
      
     
      console.log('changed successfully')
      // Update successful.
    }) .catch(error => {
  
    let toast = this.toastCtrl.create({
      message: ''+error,
      duration: 3000
    });
    toast.present();
    console.log(error)
  });
  this.empty();
})

loader.present();
 }).catch(error => {

  let toast = this.toastCtrl.create({
    message: 'Wrong current password' ,
    duration:5000,
    cssClass: "toastclr"

  });
  toast.present();          
    });

}

  changepass(){

  if(this.oldpass.value===''  || this.newpass.value===''  || this.confirmpass.value===''){
      let toast = this.toastCtrl.create({
        message: 'Please fill all the requires spaces',
        duration:3000,
        cssClass: "toastclr"
    
      });
      toast.present(); 

    }
   else{
    if(this.newpass.value!=this.confirmpass.value){
      let toast = this.toastCtrl.create({
        message: 'Passwords do not match!',
        duration:3000,
        cssClass: "toastclr"
    
      });
      toast.present(); 
      
    }
    else{
      this.change();
    }
   }

  }


}

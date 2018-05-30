import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {  ToastController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
  email;

  constructor(public navCtrl: NavController,private firebaseauth:AngularFireAuth,public alertCtrl:AlertController,
    private toastCtrl:ToastController,private fdb:AngularFireDatabase,private dbAuth: AngularFireAuth, 
    public navParams: NavParams,public afAuth: AngularFireAuth,public loadingCtrl: LoadingController) {

      const auth = afAuth.auth;
      const user = this.firebaseauth.auth.currentUser;
      const newPassword = this.newpass='';

     
  
  this.confirmpass='';
  this.oldpass='';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  public change(){
    
    let loader = this.loadingCtrl.create({
      spinner:"bubbles",
      content:"Please wait...",
      duration:3000

    });

    loader.onDidDismiss(() => {

    const auth = this.afAuth.auth;
    const user = this.firebaseauth.auth.currentUser;
    const newPassword = this.newpass.value;


    user.updatePassword(newPassword).then(function() {
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
  let alert= this.alertCtrl.create({subTitle:'Password successsfully changed!',
  buttons: [{
    text: "OK",
}],});
  alert.present();
  this.empty();
})
loader.present();
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
  empty(){
    this.oldpass.value='';
    this.newpass.value='';
    this.confirmpass.value='';
  }

}

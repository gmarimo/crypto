import { Component, ViewChild, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth'
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { HomePage } from '../home/home';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { EmailconfirmationPage } from '../emailconfirmation/emailconfirmation';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuController } from 'ionic-angular/index';
import { TermsPage } from '../terms/terms';

@IonicPage()
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html',
})
@Injectable()
export class CreateaccountPage {
  private user: firebase.User;
  
  format:string = '\d{1}[a-zA-Z]{2}\d{6}';

 
  formgroup:FormGroup;
 /* email:AbstractControl;
  password1:AbstractControl;
  password2:AbstractControl;
*/

   @ViewChild ('email') email;
   

  constructor(private fdb:AngularFireDatabase,public loadingCtrl: LoadingController,private firebaseauth:AngularFireAuth, public navCtrl: NavController,
     public navParams: NavParams,public formbuilder:FormBuilder,public toastCtrl: ToastController,
     private alertCtrl:AlertController,public angularFireAuth: AngularFireAuth,private menu: MenuController) {


    
      this.formgroup=formbuilder.group({
        email:['',Validators.required],
        //password1: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
       // password2: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
      });
      this.email = this.formgroup.controls['email'];
    
    var generator = require('generate-password');
 
  var pass:string = generator.generate({
      length: 10,
      numbers: true
  });
   
  // 'uEyMTw32v9'
  console.log(pass);
 
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccountPage');
  }

  public loader(){
      let loader = this.loadingCtrl.create({
        spinner:"bubbles",
        content:"Creating your account..",
        duration:5000 
      });
      loader.present(); 
    }

  createuser () {
      if (this.email.value == ''){

        let toast = this.toastCtrl.create({
          message: 'Email field should not be empty ',
          duration: 5000
        });
        toast.present();
       
      }else{

        this.loader();

         var generator = require('generate-password');
 
  var password1 = generator.generate({
      length: 10,
      numbers: true
  });
   
  // 'uEyMTw32v9'
  //console.log(password1);

        
        this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value,password1)
        .then (data => { 
          this.sendcode();
          })
          .catch(err => {
          
              let toast = this.toastCtrl.create({
                message: 'Oops, ' + err,
                duration: 7000
              });
              toast.present();
          });
          
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var date:Date = new Date();
    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
    ref.set({
          USD:0,
    })
    var refBTC = this.fdb.database.ref('UserID').child(newstr).child('Bit Coin').child(''+date);
    refBTC.set({
          Ethereum:0,
    })
    var refLith = this.fdb.database.ref('UserID').child(newstr).child('Ethereum').child(''+date);
    refLith.set({
          Ethereum:0,
    })
    
      }
    
} 
    login (){
      this.navCtrl.push(HomePage);
     //this.navCtrl.push(EmailconfirmationPage);
      
  }
empty(){
  this.email.value=null;

}
crtUsr(){
  var re = "@";
  var r=".";
  var str:string = this.email.value;
  var newstr = str.replace(re,"");
  return newstr;
}
signUp(){

 /* var generator = require('generate-password');
 
  this.password1.value = generator.generate({
      length: 10,
      numbers: true
  });
   
  // 'uEyMTw32v9'
  console.log(this.password1.value);
*/ 

}
sendcode(){

  this.angularFireAuth.auth.sendPasswordResetEmail(this.email.value,) 
  .then(() => {
    console.log('email sent');

   //* this.load();

  let alert= this.alertCtrl.create({subTitle:'Please check your email to reset password!',
  buttons: [{
    text: "OK",
    handler: () => {
        this.navCtrl.push(HomePage, {});
    },
}],});
  alert.present();
  })

  .catch(error => {
  
    let toast = this.toastCtrl.create({
      message: ''+error,
      duration: 5000
    });
    toast.present();
  
console.log("Email verification failed, please try again", error)
})
console.log(this.email.value);

}
terms(){
  this.navCtrl.push(TermsPage);
}
}

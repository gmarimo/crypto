import { Component, ViewChild, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { EmailconfirmationPage } from '../emailconfirmation/emailconfirmation';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html',
})

export class CreateaccountPage {

  
  format:string = '\d{1}[a-zA-Z]{2}\d{6}';

 
  formgroup:FormGroup;
 /* email:AbstractControl;
  password1:AbstractControl;
  password2:AbstractControl;
*/

   @ViewChild ('email') email;
   @ViewChild ('password1') password1;
   @ViewChild('password2') password2;

  constructor(private fdb:AngularFireDatabase,private firebaseauth:AngularFireAuth, public navCtrl: NavController,
     public navParams: NavParams,public formbuilder:FormBuilder,public toastCtrl: ToastController,
     private alertCtrl:AlertController) {

      this.formgroup=formbuilder.group({
        email:['',Validators.required],
        //password1: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
        password1:['',Validators.required],
        password2:['',Validators.required]
       // password2: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')])],
      });
      this.email = this.formgroup.controls['email'];
      this.password1 = this.formgroup.controls['password1'];
      this.password2 = this.formgroup.controls['password2'];
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccountPage');
  }

  createuser () {
    
      if(this.password1.value==this.password2.value){


    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password1.value)
    .then (data => {
    
      let Alert = this.alertCtrl.create({
        subTitle: 'User was added successfully',
        buttons: ['OK']    
      });
      Alert.present();
    console.log("Registration Successful", data);
    
    this.empty();
    //this.login();


      
    })
    .catch(err => {
    
        let toast = this.toastCtrl.create({
          message: ''+err,
          duration: 5000
        });
        toast.present();
      
    console.log("Registration failed, please try again",err)
    })
    console.log(this.email.value);

    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    var date:Date = new Date();
    var ref = this.fdb.database.ref('UserID').child(newstr).child('USD Balance').child(''+date);
    ref.set({
          USD:0,
    })
    
      }
    
      else{
        let toast = this.toastCtrl.create({
          message:'Passwords mismatch',
          duration:5000
        });
        toast.present();
      }
} 
    login (){
      this.navCtrl.push(HomePage);
     //this.navCtrl.push(EmailconfirmationPage);
      
  }
empty(){
  this.email.value=null;
  this.password1.value=null;
  this.password2.value=null;
}
crtUsr(){
  var re = "@";
  var str:string = this.email.value;
  var newstr = str.replace(re,"");
  return newstr;
}
}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { EmailconfirmationPage } from '../emailconfirmation/emailconfirmation';


/**
 * Generated class for the CreateaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html',
})

export class CreateaccountPage {

  formgroup:FormGroup;
  email:AbstractControl;
  password1:AbstractControl;
  password2:AbstractControl;


   //@ViewChild ('email') email;
  // @ViewChild ('password') password;

  constructor(private firebaseauth:AngularFireAuth, public navCtrl: NavController,
     public navParams: NavParams,public formbuilder:FormBuilder,public toastCtrl: ToastController,
     private alertCtrl:AlertController) {

      this.formgroup=formbuilder.group({
        email:['',Validators.required],
        password1:['',Validators.required],
        password2:['',Validators.required]
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
    console.log("Registration Successful", data)
    this.EConpage();
      
    })
    .catch(error => {
    
        let toast = this.toastCtrl.create({
          message: ''+error,
          duration: 3000
        });
        toast.present();
      
    console.log("Registration failed, please try again", error)
    })
    console.log(this.email.value);
    
      }
      else{
        let toast = this.toastCtrl.create({
          message:'Passwords mismatch',
          duration:3000
        });
        toast.present();
      }
} 
    EConpage (){
     // this.navCtrl.push(HomePage);
     this.navCtrl.push(EmailconfirmationPage);
      
  }
  

}

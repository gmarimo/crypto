import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';




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
     public navParams: NavParams,public formbuilder:FormBuilder,public toastCtrl: ToastController) {

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
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password1.value)
.then (data => {

  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 3000
  });
  toast.present();
console.log("Registration Successful", data)
})
.catch(error => {

    let toast = this.toastCtrl.create({
      message: 'Registration failed, please try again'+error,
      duration: 3000
    });
    toast.present();
  
console.log("Registration failed, please try again", error)
})
console.log(this.email.value);
} 
    loginpage (){
      this.navCtrl.push(HomePage);
      
  }

}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../home/home';



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

   @ViewChild ('email') email;
   @ViewChild ('password') password;

  constructor(private firebaseauth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccountPage');
  }

  createuser () {
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then (data => {
      console.log("Registration Successful", data)
    })
    .catch(error => {
      console.log("Registration failed, please try again", error)
    })
    console.log(this.email.value);
  }

  loginpage (){
    this.navCtrl.push(HomePage);
  }

}

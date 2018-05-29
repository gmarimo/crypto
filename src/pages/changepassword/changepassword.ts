import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


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

  password;
  email;

  constructor(public navCtrl: NavController,private firebaseauth:AngularFireAuth,private fdb:AngularFireDatabase,private dbAuth: AngularFireAuth, public navParams: NavParams) {
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  show(){
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log("Login successful", this.firebaseauth.auth.currentUser)
      alert(this.email.value);
    })
    

  }

}

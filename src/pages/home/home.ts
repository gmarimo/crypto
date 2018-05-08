import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AngularFireAuthModule } from 'angularfire2/auth';
import { CreateaccountPage } from '../createaccount/createaccount';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild ('email') email;
  @ViewChild ('password') password;

  constructor(private firebaseauth:AngularFireAuth, public alertctrl:AlertController, public navCtrl: NavController) {

  }

  login () {
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log("Login successful", this.firebaseauth.auth.currentUser)
      let alert = this.alertctrl.create({

        title: "Login Status",
        subTitle: "Logged in successfully!",
        buttons: ['iribho']

      }
      );
      alert.present();
      this.navCtrl.push(WalletsPage);
    })
    .catch(error => {
      console.log("Authentication failed.", error)
    })
  }

  pcreateaccount () {
    this.navCtrl.push(CreateaccountPage);
  }

}



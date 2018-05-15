import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {AlertController} from 'ionic-angular';

/**
 * Generated class for the EmailconfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailconfirmation',
  templateUrl: 'emailconfirmation.html',
})
export class EmailconfirmationPage {
  @ViewChild('email') email;
  constructor(public navCtrl: NavController, public navParams: NavParams,public angularFirebaseauth: AngularFireAuth, 
    private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailconfirmationPage');
  }

  confirm(email){
    this.angularFirebaseauth.auth.sendPasswordResetEmail(this.email.value)
    .then(() => {
      console.log('email sent');

     //* this.load();

    let alert= this.alertCtrl.create({subTitle:'Please check your email to reset password!',buttons: ['OK']});
    alert.present();
    });
    
    
  }

}

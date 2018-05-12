import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {AlertController} from 'ionic-angular';


/**
 * Generated class for the EmailverifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emailverify',
  templateUrl: 'emailverify.html',
})
export class EmailverifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth, 
    private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailverifyPage');
  }

  sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email sent');

     //* this.load();

    let alert= this.alertCtrl.create({subTitle:'Please check your email to reset password!',buttons: ['OK']});
    alert.present();
    });
    
}
 /*load(){
  let loading = this.loadingCtrl.create({
    spinner: "bubbles",
    content: "Please wait",
    duration: 4000
  });

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
 }*/

}

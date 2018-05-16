import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, ToastController} from 'ionic-angular';
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
@ViewChild('email')email;
//@ViewChild('password')password;
 password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public angularFireAuth: AngularFireAuth, 
    private alertCtrl: AlertController, public loadingCtrl: LoadingController,private toastCtrl:ToastController) {
      this.email = "tinashediego@gmail.com";
      this.password ="1231";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailconfirmationPage');
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          let toast = this.toastCtrl.create({
            message:'Email sent',
            position: 'top',
            duration:3000
          });
          toast.present();
        })
      });
  }
  register(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password)
    .then((res) => {
      this.sendEmailVerification()
    })
    .catch((err)=> {
      //Do as you please here
    });
  }
    
  }

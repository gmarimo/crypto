import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import {AlertController} from 'ionic-angular';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular/index';


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

  formgroup:FormGroup;
  email:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth, 
    private alertCtrl: AlertController,public formbuilder:FormBuilder,private menu: MenuController,
     public loadingCtrl: LoadingController,public toastCtrl: ToastController) {

      this.formgroup=formbuilder.group({
        email:['',Validators.required],
      });
      this.email = this.formgroup.controls['email'];

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
    console.log('ionViewDidLoad EmailverifyPage');
  }

  
sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(this.email.value,) 
    .then(() => {

      let loader = this.loadingCtrl.create({
        spinner:"dots",
        content:"Please wait ..",
        duration:3500,
        cssClass: "loaderwrap"
      }); 
      loader.present();
  
      console.log('email sent');

    

     //* this.load();
     loader.onDidDismiss(() => {
    let alert= this.alertCtrl.create({subTitle:'Please check your email to reset password!',
    buttons: [{
      text: "OK",
      handler: () => {
          this.navCtrl.setRoot(HomePage, {});
      },
  }],});
    alert.present();
    })
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



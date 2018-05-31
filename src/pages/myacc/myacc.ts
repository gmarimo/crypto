import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';



/**
 * Generated class for the MyaccPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myacc',
  templateUrl: 'myacc.html',
})
export class MyaccPage {

  email;

  constructor(public navCtrl: NavController,public alertctrl:AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,private firebaseauth:AngularFireAuth) {

    this.email = this.firebaseauth.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccPage');
  }


  logout(){

    let loader = this.loadingCtrl.create({
      spinner:"bubbles",
      content:"Logging out...",
      duration:4000 
    }); 
    loader.onDidDismiss(() => {
      this.navCtrl.setRoot(HomePage);

    }); 
    let alert = this.alertctrl.create({  
      title: "Logout",
      subTitle: "Are you sure you want to logout?",
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },

        {
          text: 'Yes',
          handler: () => {
            //console.log('Buy clicked');
            loader.present();
          }
        }
       


      ] 
    });
    alert.present(); 
  }
 change(){
   this.navCtrl.push(ChangepasswordPage);
   
 }

}

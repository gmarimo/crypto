import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseauth:AngularFireAuth) {

    this.email = this.firebaseauth.auth.currentUser.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccPage');
  }



}

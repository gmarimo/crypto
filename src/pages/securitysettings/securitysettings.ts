import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ChangepinPage } from '../changepin/changepin';

/**
 * Generated class for the SecuritysettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-securitysettings',
  templateUrl: 'securitysettings.html',
})
export class SecuritysettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecuritysettingsPage');
  }

  change_passwrd(){
    this.navCtrl.push(ChangepasswordPage);
  }

  change_pin(){
    this.navCtrl.push(ChangepinPage);
  }

}

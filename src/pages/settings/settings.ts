import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { SecuritysettingsPage } from '../securitysettings/securitysettings';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyaccPage } from '../myacc/myacc';
import { AppinfoPage } from '../appinfo/appinfo';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseauth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  personalInfo() {
    this.navCtrl.push(PersonalInfoPage);
  }

 security()
{
  this.navCtrl.push(SecuritysettingsPage);
}

myacc(){
  this.navCtrl.push(MyaccPage);
}
info(){
  this.navCtrl.push(AppinfoPage);
}

}

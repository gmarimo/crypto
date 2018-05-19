import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

/**
 * Generated class for the MylitewalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mylitewallet',
  templateUrl: 'mylitewallet.html',
})
export class MylitewalletPage {

  constructor(public navCtrl: NavController, public alertctrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MylitewalletPage');
  }

  alert(){
    let alert = this.alertctrl.create({
  
      title: "LiteCoin",
      subTitle: "LiteCoin is coming soon!!",
      buttons: ['ok']
  
    });
    alert.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }
  payment(){
    let alert = this.alertCtrl.create({
      title: "What methods of payment are acceptable?",
      subTitle: "<br><li>Ecocash</li><li>Telecash</li><li>V-Payments e.g ZIPPIT</li>",
      buttons: ['ok']
    });
    alert.present();
  }
  
  dep(){
    let alert = this.alertCtrl.create({
      title: "How to make your deposit fast? ",
      subTitle: "<li>After completing your deposit with PAYNOW please, forwad that email you received from PAYNOW to 'BashWallet@gmail.com' so that your USD balance will be updated instantly</li>",
      buttons: ['ok']
    });
    alert.present();
  }
  
  crypt(){
    let alert = this.alertCtrl.create({
      title: "How many crypto-currencies are available at BASH?",
      subTitle: "<li>BITCOIN is currently available at BASH</li><li>ETHERIUM is currently available at BASH</li><li>LITECOIN is coming soon!!</li><li>BASH is also coming soon!!</li>",
      buttons: ['ok']
    });
    alert.present();
  }
  

}

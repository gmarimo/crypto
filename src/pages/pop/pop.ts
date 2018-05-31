import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController} from 'ionic-angular';
import {HelpPage} from '../help/help';
import { FaqPage} from '../faq/faq';

/**
 * Generated class for the PopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html',
})
export class PopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopPage');
  }

  faq(){
    this.navCtrl.push(FaqPage);
  }
  help(){
    this.navCtrl.push(HelpPage);
  }

}

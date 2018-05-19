import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  @ViewChild('amnt') amnt;
  @ViewChild('num') num;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }

  emptyonsubmit(){
    this.amnt.value=null;
    this.num.value=null;
   
    
  }

}

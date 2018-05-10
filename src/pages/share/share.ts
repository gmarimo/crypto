import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  message:string="Hello friends i started to use this crypto-ex app last week. It's exciting and legitimate.";
  file:string= null;
  link:string=null;
  subject:string=null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }
  share(){
    this.socialSharing.shareViaEmail(this.message, this.file, [this.link,this.subject]).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}

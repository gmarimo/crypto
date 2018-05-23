import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';
import { ToastController, Nav } from 'ionic-angular';

/**
 * Generated class for the BtcdepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-btcdeposit',
  templateUrl: 'btcdeposit.html',
})
export class BtcdepositPage {
  @ViewChild('cpyBtn ') cpyBtn ;
 //@ViewChild('address') address;

  address:string;

  message:string="";
  file:string= null;
  link:string=null;
  subject:string=null;
 
  

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, 
    public navParams: NavParams,private socialSharing: SocialSharing, private clipboard: Clipboard) {

      //this.copy();
      this.address="1BoatSLRHtKNngkdXEeobR76b53LET";
      //alert(this.address);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BtcdepositPage');
  }


  copy(){
    this.clipboard = new Clipboard();
    this.clipboard.copy(this.address).then(() => {
      this.showMsg(this.toastCtrl);

    }).catch(error=>{
alert(error)
    });
    
  }


  showMsg(toastCtrl: ToastController) {
    let toast = toastCtrl.create({
        message: 'Address copied to clipboard',
        duration: 3000,
        position: 'bottom'
    });
    toast.present();
}

share(index){
  this.socialSharing.share(this.message, this.file, [this.link,this.subject]).then(() => {
    // Success!
  }).catch(error=>{
    //alert(error)
        });
}
}

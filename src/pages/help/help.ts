import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }
  buybtc(){
    {
      let alert = this.alertCtrl.create({
        title: "BUY BTC Steps",
        subTitle: "1. Enter either the USD amount or the BTC amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'BUY BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of BTC you have purchased<br><br><br>YOU ARE DONE!!",
        buttons: ['ok']
      });
      alert.present();
  
    }
  }
    sellbtc(){
      {
        let alert = this.alertCtrl.create({
          title: "SELL BTC Steps",
          subTitle: "1. Enter either the USD amount or the BTC amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'SELL BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of BTC you have sold<br><br><br>YOU ARE DONE!!",
          buttons: ['ok']
        });
        alert.present();
      }
    }
      buyeth(){
        {
          let alert = this.alertCtrl.create({
            title: "BUY ETH Steps",
            subTitle: "1. Enter either the USD amount or the ETH amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'BUY BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of ETH you have purchased<br><br><br>YOU ARE DONE!!",
            buttons: ['ok']
          });
          alert.present();
        }    
      }
        selleth(){
          {
            let alert = this.alertCtrl.create({
              title: "SELL ETH Steps",
              subTitle: "1. Enter either the USD amount or the ETH amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'SELL BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of ETH you have sold<br><br><br>YOU ARE DONE!!",
              buttons: ['ok']
            });
            alert.present();
          }
  }
  buyltc(){
    let alert = this.alertCtrl.create({
      title: "BUY LTC Steps",
      subTitle: "1. Enter either the USD amount or the LTC amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'BUY BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of LTC you have purchased<br><br><br>YOU ARE DONE!!",
      buttons: ['ok']
    });
    alert.present();

  }
    sellltc(){
      {
        let alert = this.alertCtrl.create({
          title: "SELL LTC Steps",
          subTitle: "1. Enter either the USD amount or the LTC amount <br><br>NB: 'Minimum USD value a user can enter is $20'<br><br> 2. Press the 'SELL BUTTON' below and wait for the process to complete.<br><br> 3. Check the Transaction History to see the value of LTC you have sold<br><br><br>YOU ARE DONE!!",
          buttons: ['ok']
        });
        alert.present();
      }
}
}

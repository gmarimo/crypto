import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreateaccountPage } from '../pages/createaccount/createaccount';
import { WalletsPage } from '../pages/wallets/wallets';
import { BuybtcPage } from '../pages/buybtc/buybtc';
import { BuyethPage } from '../pages/buyeth/buyeth';
import { DepositPage } from '../pages/deposit/deposit';
import { SellbtcPage } from '../pages/sellbtc/sellbtc';
import { SellethPage } from '../pages/selleth/selleth';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { MybtcwalletPage } from '../pages/mybtcwallet/mybtcwallet';
import { MyusdwalletPage } from '../pages/myusdwallet/myusdwallet';
import { MyethwalletPage } from '../pages/myethwallet/myethwallet';
import { BtcdepositPage } from '../pages/btcdeposit/btcdeposit';
import { BtcwithdrawPage } from '../pages/btcwithdraw/btcwithdraw';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



const firebase = {
  apiKey: "AIzaSyBj6shCVnamFe9IAptn0TGklVuFZCypmxQ",
  authDomain: "crypto-ex.firebaseapp.com",
  databaseURL: "https://crypto-ex.firebaseio.com",
  projectId: "crypto-ex",
  storageBucket: "crypto-ex.appspot.com",
  messagingSenderId: "730339161700"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateaccountPage,
    WalletsPage,
    BuybtcPage,
    BuyethPage,
    DepositPage,
    SellbtcPage,
    SellethPage,
    WithdrawPage,
    MybtcwalletPage,
    MyethwalletPage,
    MyusdwalletPage,
    BtcdepositPage,
    BtcwithdrawPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase, 'crypto'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateaccountPage,
    WalletsPage,
    BuybtcPage,
    BuyethPage,
    DepositPage,
    SellbtcPage,
    SellethPage,
    WithdrawPage,
    MybtcwalletPage,
    MyethwalletPage,
    MyusdwalletPage,
    BtcdepositPage,
    BtcwithdrawPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

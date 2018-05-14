import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { Camera } from '@ionic-native/camera';
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
import { EthdepositPage } from '../pages/ethdeposit/ethdeposit';
import { EthwithdrawPage } from '../pages/ethwithdraw/ethwithdraw';
import { ExchangePage } from '../pages/exchange/exchange';
import { PrepaidPage } from '../pages/prepaid/prepaid';
import { SettingsPage } from '../pages/settings/settings';
import { AlertsPage } from '../pages/alerts/alerts';
import { SharePage } from '../pages/share/share';
import { InvitePage } from '../pages/invite/invite';
import { CryptomarketPage } from '../pages/cryptomarket/cryptomarket';
import { TradePage } from '../pages/trade/trade';
import { TermsPage } from '../pages/terms/terms';
import { TabsPage } from '../pages/tabs/tabs';
import { BtcbuysuccessPage } from '../pages/btcbuysuccess/btcbuysuccess';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { LogoutPage} from '../pages/logout/logout';
import { PersonalInfoPage} from '../pages/personal-info/personal-info';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SecuritysettingsPage } from '../pages/securitysettings/securitysettings';
import { ChangepinPage } from '../pages/changepin/changepin';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword'
import { EmailverifyPage } from '../pages/emailverify/emailverify'
import { Camera} from '@ionic-native/camera';




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
    BtcwithdrawPage,
    EthdepositPage,
    EthwithdrawPage,
    ExchangePage,
    PrepaidPage,
    SettingsPage,
    AlertsPage,
    SharePage,
    InvitePage,
    CryptomarketPage,
    TradePage,
    TermsPage,
    TabsPage,
    ChangepasswordPage,
    LogoutPage,
    PersonalInfoPage,
    BtcbuysuccessPage,
    SecuritysettingsPage,
    ChangepinPage,
    ResetpasswordPage,
    EmailverifyPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModiles: true
    }),
    AngularFireModule.initializeApp(firebase, 'crypto'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    //BsDropdownModule.forRoot(),
    //NgxIntlTelInputModule
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
    BtcwithdrawPage,
    EthdepositPage,
    EthwithdrawPage,
    ExchangePage,
    PrepaidPage,
    SettingsPage,
    AlertsPage,
    SharePage,
    InvitePage,
    CryptomarketPage,
    TradePage,
    TermsPage,
    TabsPage,
    ChangepasswordPage,
    LogoutPage,
    PersonalInfoPage,
    BtcbuysuccessPage,
    SecuritysettingsPage,
    ChangepinPage,
    ResetpasswordPage,
    EmailverifyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    SocialSharing,
    AngularFireAuth
  ]
})
export class AppModule {}

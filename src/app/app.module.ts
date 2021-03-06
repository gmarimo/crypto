import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { Camera } from '@ionic-native/camera';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
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
//import { AlertsPage } from '../pages/alerts/alerts';
import { SharePage } from '../pages/share/share';
import { InvitePage } from '../pages/invite/invite';
import { CryptomarketPage } from '../pages/cryptomarket/cryptomarket';
import { TradePage } from '../pages/trade/trade';
import { TermsPage } from '../pages/terms/terms';
import { TabsPage } from '../pages/tabs/tabs';
import { BtcbuysuccessPage } from '../pages/btcbuysuccess/btcbuysuccess';
import { EthbuysuccessPage } from '../pages/ethbuysuccess/ethbuysuccess';
import { MyaccPage } from '../pages/myacc/myacc';
import { AppinfoPage } from '../pages/appinfo/appinfo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { LogoutPage} from '../pages/logout/logout';
import { PersonalInfoPage} from '../pages/personal-info/personal-info';
import { UsdwithdrawalPage } from '../pages/usdwithdrawal/usdwithdrawal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SecuritysettingsPage } from '../pages/securitysettings/securitysettings';
import { ChangepinPage } from '../pages/changepin/changepin';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword'
import { EmailverifyPage } from '../pages/emailverify/emailverify'
import { Camera} from '@ionic-native/camera';
import { RecaptchaModule } from 'ng-recaptcha';
import { EmailconfirmationPage } from '../pages/emailconfirmation/emailconfirmation';
import { DeposithistoryPage } from '../pages/deposithistory/deposithistory';
import { BuylitePage } from '../pages/buylite/buylite';
import { SellitePage } from '../pages/sellite/sellite';
import { MylitewalletPage } from '../pages/mylitewallet/mylitewallet';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@ionic-native/clipboard';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import { BtcsellhistoryPage } from '../pages/btcsellhistory/btcsellhistory'
import { PopPage } from '../pages/pop/pop';
import { FaqPage } from '../pages/faq/faq';
import {HelpPage} from '../pages/help/help';
//import { CallNumber } from '@ionic-native/call-number';




const firebase = {
  apiKey: "AIzaSyAmJ4Pbf0QEJeQp4lqjeY1R56rHN31uj7U",
  authDomain: "proserver-da5d7.firebaseapp.com",
  databaseURL: "https://proserver-da5d7.firebaseio.com",
  projectId: "proserver-da5d7",
  storageBucket: "proserver-da5d7.appspot.com",
  messagingSenderId: "318732346081"
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
    PopPage,
   // AlertsPage,
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
    EmailverifyPage,
    EmailconfirmationPage,
    DeposithistoryPage,
    BuylitePage,
    SellitePage,
    MylitewalletPage,
    EthbuysuccessPage,
    UsdwithdrawalPage,
    MyaccPage,
    BtcsellhistoryPage,
    FaqPage,
    HelpPage,
    AppinfoPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModiles: true
    }),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    BrowserModule,
    AngularFireAuthModule
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
   // AlertsPage,
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
    EmailverifyPage,
    EmailconfirmationPage,
    DeposithistoryPage,
    BuylitePage,
    SellitePage,
    MylitewalletPage,
    EthbuysuccessPage,
    UsdwithdrawalPage,
    MyaccPage,
    BtcsellhistoryPage,
    PopPage,
    FaqPage,
    HelpPage,
    AppinfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    SocialSharing,
    AngularFireAuth,
    DatePipe,
    Clipboard,
    ScreenOrientation,
    
    //CallNumber
    
  ]
})
export class AppModule {}

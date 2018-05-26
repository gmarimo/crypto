import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, TapClick } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { DepositPage } from '../pages/deposit/deposit';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { ExchangePage } from '../pages/exchange/exchange';
import { PrepaidPage } from '../pages/prepaid/prepaid';
import { SettingsPage } from '../pages/settings/settings';
import { AlertsPage } from '../pages/alerts/alerts';
import { SharePage } from '../pages/share/share';
import { InvitePage } from '../pages/invite/invite';
import { WalletsPage } from '../pages/wallets/wallets';
import { LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: String}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    platform.ready().then(() => {});

    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage }
      //{ title: 'Exchange', component: ExchangePage, icon: "swap" },
      { title: 'Wallets', component: WalletsPage, icon: "cash" },
      { title: 'Deposit USD', component: DepositPage, icon: "arrow-down" },
      { title: 'Withdraw USD', component: WithdrawPage, icon: "arrow-up" },
      { title: 'Prepaid card', component: PrepaidPage, icon: "card" },
      { title: 'Settings', component: SettingsPage, icon: "cog" },
      //{ title: 'Alerts', component: AlertsPage, icon: "alert" },
      { title: 'Share', component: SharePage, icon: "share" },
      //{ title: 'Invite friends', component: InvitePage, icon: "person-add" },
      { title: 'Logout', component: LogoutPage, icon: "log-out" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

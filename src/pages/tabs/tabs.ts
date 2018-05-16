import { Component } from '@angular/core';

import { CryptomarketPage } from '../cryptomarket/cryptomarket';
import { TradePage } from '../trade/trade';
import { BuybtcPage } from '../buybtc/buybtc';
import { TermsPage } from '../terms/terms';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CryptomarketPage;
  tab2Root = TradePage;
  tab3Root = BuybtcPage;
  tab4Root = TermsPage;
  myIndex: number;

  constructor() {

  }
}


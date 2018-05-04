import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CryptomarketPage } from './cryptomarket';

@NgModule({
  declarations: [
    CryptomarketPage,
  ],
  imports: [
    IonicPageModule.forChild(CryptomarketPage),
  ],
})
export class CryptomarketPageModule {}

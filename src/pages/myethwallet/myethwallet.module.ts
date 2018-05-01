import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyethwalletPage } from './myethwallet';

@NgModule({
  declarations: [
    MyethwalletPage,
  ],
  imports: [
    IonicPageModule.forChild(MyethwalletPage),
  ],
})
export class MyethwalletPageModule {}

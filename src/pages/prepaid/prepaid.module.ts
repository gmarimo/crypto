import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrepaidPage } from './prepaid';

@NgModule({
  declarations: [
    PrepaidPage,
  ],
  imports: [
    IonicPageModule.forChild(PrepaidPage),
  ],
})
export class PrepaidPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaccPage } from './myacc';

@NgModule({
  declarations: [
    MyaccPage,
  ],
  imports: [
    IonicPageModule.forChild(MyaccPage),
  ],
})
export class MyaccPageModule {}

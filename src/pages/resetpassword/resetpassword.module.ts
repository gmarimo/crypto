import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetpasswordPage } from './resetpassword';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    ResetpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetpasswordPage),
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule
  ],
})
export class ResetpasswordPageModule {}

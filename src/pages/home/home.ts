import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Nav } from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CreateaccountPage } from '../createaccount/createaccount';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { WalletsPage } from '../wallets/wallets';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
//import { Directive, forwardRef, Attribute } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage = 'HomePage';
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Crypto-ex Market', pageName: 'TabsPage', tabComponent: 'CryptomarketPage', index: 0, icon: 'home' },
    { title: 'Terms & Conditions', pageName: 'TabsPage', tabComponent: 'TermsPage', index: 0, icon: 'home' },
  ]


  formgroup:FormGroup;
  email:AbstractControl;
  password:AbstractControl;
 // @ViewChild ('email') email;
  //@ViewChild ('password') password;

  constructor(private firebaseauth:AngularFireAuth, public loadingCtrl: LoadingController,
     public alertctrl:AlertController, public navCtrl: NavController, 
     private toastCtrl:ToastController, public formbuilder:FormBuilder) {
      this.formgroup=formbuilder.group({
        email:['',Validators.required],
        password:['',Validators.required]
        
      });
    
      this.email = this.formgroup.controls['email'];
      this.password = this.formgroup.controls['password'];
    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

 public loader(){
   if(this.email.value!=''&& this.password.value!=''){
     let loader = this.loadingCtrl.create({


       spinner:"bubbles",
       content:"Securely Logging you in...",
       duration:3000

     });

     loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loader.present()
 }

}
 
  login () {
   
    this.loader();
      this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      console.log("Login successful", this.firebaseauth.auth.currentUser)
      let alert = this.alertctrl.create({

        title: "Login Status",
        subTitle: "Logged in successfully!",
        buttons: ['ok']

      });
      alert.present();
      this.navCtrl.setRoot(WalletsPage);
    })

   .catch(error => { 

    let toast = this.toastCtrl.create({
      message: 'Email or password invalid, please verify your details and try again.' ,
      duration:5000,
      cssClass: "toastclr"

    });
    toast.present();          
      });
      
} 


  pcreateaccount () {
    this.navCtrl.push(CreateaccountPage);
  }

  resetpass (){
    this.navCtrl.push(ResetpasswordPage);
  }

  openPage(page: PageInterface) {

  }

  isActive(page: PageInterface) {

  }

}



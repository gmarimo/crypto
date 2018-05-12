import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CreateaccountPage } from '../createaccount/createaccount';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { Directive, forwardRef, Attribute } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  formgroup:FormGroup;
  email:AbstractControl;
  password:AbstractControl;
 // @ViewChild ('email') email;
  //@ViewChild ('password') password;

  constructor(private firebaseauth:AngularFireAuth, public loadingCtrl: LoadingController,
     public alertctrl:AlertController, public navCtrl: NavController, 
     private toastCtrl:ToastController, public formbuilder:FormBuilder,public errorservice:ErrorServices) {
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
       content:"Securing Login...",
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

      }
      );
      alert.present();
      this.navCtrl.push(WalletsPage);
    })

   .catch(error => { 

    let toast = this.toastCtrl.create({
      message: '' + error ,
      duration:3000

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

}



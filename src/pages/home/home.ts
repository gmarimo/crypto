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
import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from 'ionic-angular/index';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Request, RequestMethod} from '@angular/http';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import { EmailverifyPage } from '../emailverify/emailverify';



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

  splash = true;

  public screenOrientation: ScreenOrientation;

  rootPage = 'HomePage';
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: 'Crypto-ex Market', pageName: 'TabsPage', tabComponent: 'CryptomarketPage', index: 0, icon: 'home' },
    { title: 'Terms & Conditions', pageName: 'TabsPage', tabComponent: 'TermsPage', index: 0, icon: 'home' },
  ]


  formgroup:FormGroup;
  //email:AbstractControl;
  //password:AbstractControl;
 @ViewChild ('email') email;
 @ViewChild ('password') password;
  private captchaPassed: boolean = false;
  private captchaResponse: string;

  constructor(private firebaseauth:AngularFireAuth, public loadingCtrl: LoadingController,
     public alertctrl:AlertController, public navCtrl: NavController, public http: Http, private zone: NgZone,
     private toastCtrl:ToastController,screenOrientation: ScreenOrientation, public formbuilder:FormBuilder,private menu: MenuController) {
      this.formgroup=formbuilder.group({
        email:['',Validators.required],
        password:['',Validators.required]
        
      });
    
      this.email = this.formgroup.controls['email'];
      this.password = this.formgroup.controls['password'];

      //this.lockPortrait();
   
    
    
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }
   

   //lockPortrait() {
    //alert('Orientation locked portrait.');
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  //}
  /*
//capture function
  captchaResolved(response: string): void {
 
    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });

}

sendForm(): void {

    let data = {
        captchaResponse: this.captchaResponse
    };     

    this.http.post('http://localhost:8100/ionic-lab', data).subscribe(res => {
        console.log(res);
    });

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
 
const captchaCheck = (req, res, next) => {
 
    console.log("CAPTCHA middleware activated");
 
    let urlEncodedData = 'secret=6Le0E1kUAAAAAPCsHP17aW95o_eAx27CSonyhtTt&response=' + req.body.captchaResponse + '&remoteip=' + req.connection.remoteAddress;
 
    this.http.post('https://www.google.com/recaptcha/api/siteverify', urlEncodedData, {
 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
 
    })
    .then((res) => {
 
        if(res.data.success){
            next();
        } else {
            res.status(401).send({message: 'No bots!'});
        }
 
    }).catch((err) => {
        console.log(err);
        res.status(401).send({message: 'No bots!'});
    });
 
}
 
app.use(captchaCheck);
 
app.post('/test', (req, res) => {
    res.json('Hello, human.');
});
 
app.listen(process.env.PORT || 8080);

}
//end of capture code

*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    setTimeout(() => this.splash = false, 4000);
  }

 public loader(){
   if(this.email.value!=''&& this.password.value!=''){
     let loader = this.loadingCtrl.create({


       spinner:"bubbles",
       content:"Securely Logging you in...",
       duration:2000

     });

     loader.onDidDismiss(() => {
      let loader = this.loadingCtrl.create({
        spinner:"dots",
        //content:"Loading ..",
        duration:5000,
        cssClass: "loaderwrap"
      }); 
      loader.present();
    }); 
    loader.present()
 }

}
 
  login () {
   
    this.loader(); 
      this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => { 
      console.log("Login successful", this.firebaseauth.auth.currentUser)
      this.navCtrl.setRoot(WalletsPage);
    })

   .catch(error => {

    let toast = this.toastCtrl.create({
      message: 'Oops! ' + error ,
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
    this.navCtrl.push(EmailverifyPage);
  }

  openPage(page: PageInterface) {

  }

  isActive(page: PageInterface) {

  }
  

}



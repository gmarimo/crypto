import { Component,NgZone,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
//import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {  ToastController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AlertController} from 'ionic-angular';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [Camera],
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
  
})
export class PersonalInfoPage {

  public myImage:string;

  @ViewChild ('email') email;
  @ViewChild ('name') name;
  @ViewChild ('surname') surname;
  @ViewChild ('idnum') idnum;
  @ViewChild ('phone') phone;
  @ViewChild ('dob') dob;
  @ViewChild ('address') address;
  @ViewChild ('gender') gender;

  constructor(private fdb:AngularFireDatabase,public camera:Camera, private dbAuth: AngularFireAuth,
    private alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl:ToastController,/*public formbuilder:FormBuilder,*/public navCtrl: NavController,public ngzone: NgZone) {
    this.email ='';
    this.name = '';
    this.surname = '';
    this.idnum ='';
    this.phone='';
    this.dob='';
    this.address='';
    this.gender='';
       this.myImage = "https://placehold.it/150x150";
  }

  public takePic(){

    this.camera.getPicture({

            quality : 75,
            destinationType : this.camera.DestinationType.DATA_URL,
            sourceType : this.camera.PictureSourceType.CAMERA,
            allowEdit : false,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: true

    }).then( (imageData) => {

        this.myImage = "data:image/jpeg;base64," + imageData;

    }, (err) => {

        alert(err);
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }


  profile(){

    this.loader();
    var date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('User Profile');//.child(''+date);
    ref.set({
          EMAIL:this.email.value,
          NAME:this.name.value,
          SURNAME:this.surname.value,
          ID_NUMBER:this.idnum.value,
          PHONE:this.phone.value,
          D_O_B:this.dob.value,
          ADDRESS:this.address.value,
          GENDER:this.gender.value
    }).catch(error => { 

      let toast = this.toastCtrl.create({
        message: 'Oops! ' + error ,
        duration:5000,
        cssClass: "toastclr"
  
      });
      toast.present();          
        });

}

  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }
  public loader(){
    if(this.email.value!=''&& this.surname.value!=''&& this.idnum.value!=''
       && this.gender.value!=''&& this.phone.value!=''&& this.dob.value!=''
      && this.address.value!=''&& this.name.value!=''){
      let loader = this.loadingCtrl.create({
 
        spinner:"bubbles",
        content:"Updating your profile...",
        duration:5000
 
      });
 
      loader.onDidDismiss(() => {
       let loader = this.loadingCtrl.create({
         spinner:"dots",
         //content:"Loading ..",
         duration:2000,
         cssClass: "loaderwrap"
       }); 
       loader.present();
     }); 
     loader.present()
     loader.onDidDismiss(() => {
      let alert= this.alertCtrl.create({
        
        subTitle:'Successfully updated profile',
        buttons: [{
        text: "OK",
        handler: () => {
            //this.navCtrl.setRoot(HomePage, {});
        },
    }],});
      alert.present();
      })
  }
 else{
  let toast = this.toastCtrl.create({
    message: 'Please fill all the requires spaces ',
    duration:5000,
    cssClass: "toastclr"

  });
  toast.present();          
  }
 }
}

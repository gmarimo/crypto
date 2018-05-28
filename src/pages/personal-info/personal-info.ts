import { Component,NgZone,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
//import { FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {  ToastController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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

  constructor(private fdb:AngularFireDatabase,public camera:Camera, private dbAuth: AngularFireAuth,public loadingCtrl: LoadingController,private toastCtrl:ToastController,/*public formbuilder:FormBuilder,*/public navCtrl: NavController,public ngzone: NgZone) {
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
    var date:Date = new Date();
    var re = ".";
    var str = this.crtUsr();
    var newstr = str.replace(re,"");
    
    var ref = this.fdb.database.ref('UserID').child(newstr).child('User Profile').child(''+date);
    ref.set({
          EMAIL:this.email.value,
          NAME:this.name.value,
          SURNAME:this.surname.value,
         ID_NUMBER:this.idnum.value,
          PHONE:this.phone.value,
          D_O_B:this.dob.value,
          ADDRESS:this.address.value,
          GENDER:this.gender.value
    })

}

  crtUsr(){
    var re = "@";
    var str = this.dbAuth.auth.currentUser.email;
    var newstr = str.replace(re,"");
    return newstr;
  }
  public validation(){
    /*
    if(this.name=''&&(
      this.surname='')&&(
      this.idnum='')&&(
      this.phone='')&&(
      this.dob='')&&(
      this.address='')&&(
      this.gender='')){

        let toast = this.toastCtrl.create({
          message: 'Please enter all required fields ',
          duration:5000,
          cssClass: "toastclr"
    
        });
        toast.present();
      }
      else{
        alert('in else')
       this.profile();
      }*/
      this.profile();
  }


}

import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';

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
  constructor(public camera:Camera,public navCtrl: NavController,public ngzone: NgZone) {

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

}

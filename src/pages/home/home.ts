import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any = {};
  scannedCode = null;
 
  constructor(public navCtrl: NavController, public http: Http, private barcodeScanner: BarcodeScanner) {
    this.data.ic = '';
    this.data.response = '';
    
    this.http = http;
  }
 
  submit() {
    var link = 'http://192.168.8.100/scan/test.php';
    var myData = JSON.stringify({ic: this.data.ic});
    
    this.http.post(link, myData)
    .subscribe(data => {
      this.data.response = data["_body"];
    }, error => {
      console.log("Oooops!");
    });
  }

  scanCode(){
    var link = 'http://192.168.8.100/scan/test.php';
    var myData = JSON.stringify({ic: this.scannedCode});

    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.http.post(link, myData)
      .subscribe(data => {
        this.data.response = data["_body"];
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }
}

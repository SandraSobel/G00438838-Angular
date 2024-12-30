import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';

//api key: pub_63737dcb893386948bba07842734f4473e638

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  //newsArray: any;
  apiKey: string = "pub_63737dcb893386948bba07842734f4473e638"; 
  countrySelected: any;

  constructor(private mds:MyDataServiceService) { }

  ngOnInit() {
    //this.newsArray = []; 
    this.countrySelected = []; 
  }

  /*everytime page is about to be displayed:store index array */
  ionViewWillEnter(){    
    this.getCountryIndexFromLocalStorage();   
}

  /*get country from array*/
  async getCountryIndexFromLocalStorage() {
    this.countrySelected = await this.mds.getCountrySelected('countrySelected');
    console.log("This is getCountryIndex method, checking if array is returned from local storage" ); 
    console.log(this.countrySelected);
  }



}



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html', 
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton]
})
export class WeatherPage implements OnInit {


  apiKey: string = "86624b4df35ec5ac4a5aec088d78a6ad"; 
  countrySelected: any;  
  countrySelectedName:string = "";
  capitalName:string="";
  options: HttpOptions = {url: ""};
  weatherArray:any;  
  noWeather:string ="No weather found for capital of " 

  constructor(private mds:MyDataServiceService) { }

  ngOnInit() {    
    this.countrySelected = []; 
    this.weatherArray = [];      
  }

 
//method to clean up
  /*everytime page is about to be displayed:store index array */
  ionViewWillEnter(){    
    this.getCountryAndCapitalSelectedName();
    //this.setApiUrl();
    this.getWeatherAPI();
}

  /*get country from array*/
  async getCountryFromLocalStorage() {    
    this.countrySelected = await this.mds.getCountrySelected('countrySelected');
    console.log("This is tCountryFromLocalStorage, checking if array is returned from local storage" ); 
    console.log(this.countrySelected);
  }

  
  async setApiUrl(){
    await this.getCountryFromLocalStorage();
    let urlStart:string = "https://api.openweathermap.org/data/2.5/weather?"; 
    let urlKey:string ="appid="+ this.apiKey;
    let urlAnd:string = "&";
    let urlUnits:string = "units = UNITS"
    let urlLat:string = "lat=" + this.countrySelected[0].latlng[0];
    let urlLon:string = "lon=" + this.countrySelected[0].latlng[1];
    this.options = {
      url: urlStart + urlLat + urlAnd + urlLon + urlAnd + urlUnits + urlAnd + urlKey
    }
    console.log("this is url used to get api from setApiUrl method")
    console.log(urlStart + urlLat + urlAnd + urlLon + urlAnd + urlUnits + urlAnd + urlKey)
    console.log(this.options)
  }

  async getCountryAndCapitalSelectedName() {
    await this.getCountryFromLocalStorage(); 
    this.countrySelectedName = this.countrySelected[0].name.official;    
    console.log(this.countrySelectedName);
    this.capitalName = this.countrySelected[0].capitalName;
    console.log(this.capitalName);    
  }

  //method to clean up  
  async getWeatherAPI() {
    await this.setApiUrl();    
    let result = await this.mds.getApiData(this.options);
    console.log(result.data);    
    
    /*this.weatherArray.push(result.data.results);
    this.weatherArray = this.weatherArray[0];
         
    console.log(this.weatherArray);     */
  }


}



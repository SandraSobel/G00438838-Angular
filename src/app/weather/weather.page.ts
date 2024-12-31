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
  weatherData:any; 
  noWeather:string ="No weather found for capital of " 
  urlToIcon:string="";  
  temp: number = 0;
  description: string = "";
  units:string = "";

    
  constructor(private mds:MyDataServiceService) { }

  ngOnInit() {    
    this.countrySelected = []; 
    this.weatherData  =[];     
  }

 
//method to clean up
  /*everytime page is about to be displayed:store index array */
  ionViewWillEnter(){    
    this.getCountryAndCapitalSelectedName();         
    this.getWeatherData();
  }
  async getCountryAndCapitalSelectedName() {
    await this.getCountryFromLocalStorage(); 
    this.countrySelectedName = this.countrySelected[0].name.official;    
    console.log(this.countrySelectedName);
    this.capitalName = this.countrySelected[0].capital[0];
    console.log(this.capitalName);    
  }

   /*get country from array*/
   async getCountryFromLocalStorage() {    
    this.countrySelected = await this.mds.getCountrySelected('countrySelected');
    console.log("This is tCountryFromLocalStorage, checking if array is returned from local storage" ); 
    console.log(this.countrySelected);
  } 

  async getWeatherData() {
    await this.setIconUrl();
    this.temp =  this.weatherData.main.temp;
    this.description =  this.weatherData.weather[0].description;
    
    
  }

  async setIconUrl(){    
    await this.getWeatherAPI(); 
    let urlStart:string = "https://openweathermap.org/img/wn/"
    let urlEnd:string ="@2x.png"
    let iconId: string = this.weatherData.weather[0].icon;
    this.urlToIcon = urlStart+iconId+urlEnd;
    console.log("This is API url to get ICON(setIconUrl method)"  + this.urlToIcon);

  }  

  //method to clean up  
  async getWeatherAPI() {
    await this.setApiUrl();    
    let result = await this.mds.getApiData(this.options);     
    this.weatherData.push(result.data); 
    this.weatherData = this.weatherData[0];    
    console.log(this.weatherData);
    
  }
  async setApiUrl(){
    //await this.getCountryFromLocalStorage();
    await this.getUnits();
    let urlStart:string = "https://api.openweathermap.org/data/2.5/weather?"; 
    let urlKey:string ="appid="+ this.apiKey;
    let urlAnd:string = "&";
    let urlUnits:string = "units=" + this.units;
    let urlLat:string = "lat=" + this.countrySelected[0].latlng[0];
    let urlLon:string = "lon=" + this.countrySelected[0].latlng[1];
    this.options = {
      url: urlStart + urlLat + urlAnd + urlLon + urlAnd + urlUnits + urlAnd + urlKey
    }
    console.log("This is API url to get weather data(setApiUrl method)" +JSON.stringify(this.options)) ;
    console.log(urlStart + urlLat + urlAnd + urlLon + urlAnd + urlUnits + urlAnd + urlKey);
   
  }

  async getUnits(){ 
      const units:string = await this.mds.getUnits()
      if (units) {
        this.units = units;
      } else {
        await this.mds.setUnits("units", "Metric");
        this.units = await this.mds.getUnits();
      }
    }

  
  
}
  



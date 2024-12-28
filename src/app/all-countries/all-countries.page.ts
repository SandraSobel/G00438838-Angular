import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle} from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';



@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class AllCountriesPage implements OnInit {
  countryInStorage:string = "";
  countryData:any;
  foundCountries:any;
  
  

  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all"
  }

  
  constructor(private mds: MyDataServiceService) { }

  ngOnInit() { 
    this.countryData = [];  
    this.foundCountries = [];
  }

  ionViewWillEnter(){
    
    this.getCountryFromStorage();
    console.log(this.countryInStorage);    
    this.searchCountryAPI();   
    
  }

  async getCountryFromStorage() {
    this.countryInStorage = await this.mds.get('country');
  } 
   

  async searchCountryAPI() {
    await this.getAllCountriesAPI();
    await this.getCountryFromStorage();
     this.searchCountryByName( this.countryData, this.countryInStorage);
    console.log(this.foundCountries);
    console.log(this.countryInStorage);
  }

  async getAllCountriesAPI() {
    let result = await this.mds.getCountriesList(this.options);
    this.countryData = result.data;
   /*console.log(this.countryData);   */
  }

  searchCountryByName(countries:any[], search: string) {  
    if(!countries || countries.length == 0){
      console.log("empty array")           
    }      
    this.foundCountries = countries.filter(country=> country.name.official.toLowerCase() || country.name.nativeName.toLowerCase().includes(search.toLowerCase()));
    
  }
  

}

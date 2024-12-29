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
  countriesArray:any;
  foundCountries:any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all"
  }
  
  constructor(private mds: MyDataServiceService) { }

  ngOnInit() { 
    this.countriesArray = [];   
    this.foundCountries = [];     
  }


  /*load this method everytime page is about to be displayed */
  ionViewWillEnter(){    
      this.searchCountryAPI();  
  }

  /*get value associated with key value country from local storage and assign to variable */
  async getCountryFromStorage() {
    this.countryInStorage = await this.mds.get('country');
  } 
  
  
  /*load data from local storage and all countries first - then filter results on the page */
  async searchCountryAPI() {   
    await this.getCountryFromStorage();
    await this.getAllCountriesAPI();
    console.log("This is search country api method, printing countires array and country in storage");
    console.log(this.countriesArray);
    console.log(this.countryInStorage);
    
    for (let i=0; i<this.countriesArray.length;i++){
      let country :string =this.countriesArray[i].name.official;
      console.log(country);
      country = country.toLowerCase();
      console.log(country);
      let search :string = this.countryInStorage;
      console.log(search);
      search = search.toLowerCase();
      console.log(search);
      if(country.includes(search)){
        this.foundCountries.push(this.countriesArray[i]);
      }
    }
    console.log("This is search country api method, printing found countries");
    console.log(this.foundCountries);    
  }

  /*get all countries with all details from countries API*/
  async getAllCountriesAPI() {
    let result = await this.mds.getCountriesList(this.options);
    this.countriesArray = result.data;
    console.log(this.countriesArray);   
  }
  
  
}

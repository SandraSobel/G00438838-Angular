import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton} from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, CommonModule, FormsModule, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, RouterLink]
})
export class AllCountriesPage implements OnInit {  
  countryInStorage:string = "";
  countrySelected:any;
  countriesArray:any;
  foundCountries:any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all"
  }
  
  constructor(private mds: MyDataServiceService) { }

  ngOnInit() { 
    this.countriesArray = [];   
    this.foundCountries = [];  
    this.countrySelected = [];
  }


  /*everytime page is about to be displayed: load country from storage and get countries based on user input */
  ionViewWillEnter(){         
      this.searchCountryAPI();  
  }

 
  
  
  /*load data from local storage and all countries first - then filter results on the page */
  async searchCountryAPI() {   
    await this.getCountryFromStorage(); 
    await this.getAllCountriesAPI();
    console.log("This is searchCountryAPI method in allcountires, printing countires array(all) and country in storage(searched by user)");
    console.log(this.countriesArray);
    console.log(this.countryInStorage);
    console.log("This is searchCountryAPI method in allcountires, printing country in API next with searched word by user together"); //remove if no issues

    //create new array with found countries based on user input
    for (let i=0; i<this.countriesArray.length;i++){
      let country :string =this.countriesArray[i].name.official;      
      country = country.toLowerCase();
            console.log(country); //remove if no issues
      let search :string = this.countryInStorage;      
      search = search.toLowerCase();
            console.log(search); //remove if no issues
      if(country.includes(search)){
        this.foundCountries.push(this.countriesArray[i]);
      }
    }
    console.log("This is searchCountryAPI method in allcountires, printing found countries array");
    console.log(this.foundCountries);    
  }

   /*get value associated with key 'country' from local storage and assign to variable */
   async getCountryFromStorage() {
    this.countryInStorage = await this.mds.getCountry('country');
  } 

  /*get all countries with all details from countries API*/
  async getAllCountriesAPI() {
    let result = await this.mds.getApiData(this.options);
    this.countriesArray = result.data;
    console.log(this.countriesArray);   
  }
  
  /*capture index(local storage) of selected country in array foundCountries*/
  async setCountryIndex(index: number) {    
    console.log(index);
    this.countrySelected.length = 0;
    this.countrySelected.push(this.foundCountries[index]);
    await this.mds.setCountrySelected("countrySelected", this.countrySelected);  
   
  }
  
  
    
     
}


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


  /* Once page is opened run below methods */
  ionViewWillEnter(){    
    // moving to search country api method for tesitng   this.getCountryFromStorage(); //get value from local storage (country input from the page)
    console.log(this.countryInStorage);    // troubleshooting - checking if value is assigned to variable from local storage
    // moving to search country api method for tesitng this.getAllCountriesAPI(); // get all countires
    this.searchCountryAPI();
    //this.searchCountryAPI();   //currently not working - should load filtered results from API
    
  }

  /*get value associated with key value country from local storage and assign to variable */
  async getCountryFromStorage() {
    this.countryInStorage = await this.mds.get('country');
  } 
  
  /*get all countries with all details from countries API*/
  async getAllCountriesAPI() {
    let result = await this.mds.getCountriesList(this.options);
    this.countriesArray = result.data;
    console.log(this.countriesArray);   
  }
  

  /* filter results for what was searched for - currently not working */
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

   /* searchCountryByName(countries:any[], search: string) {  
    
    if(!countries || countries.length == 0){
      console.log("empty array")     /*code stops here   
    }      
    this.foundCountries = countries.filter(country=>
      country.name &&
      country.name.nativeName &&  
      typeof country.name.nativeName === 'string' && 
      country.name.nativeName.toLowerCase().includes(search.toLowerCase())
    )  
  } */
  

}

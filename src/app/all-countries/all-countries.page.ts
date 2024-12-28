import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';



@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AllCountriesPage implements OnInit {
  countryInStorage:string = "";
  

  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/all"
  }

  
  constructor(private mds: MyDataServiceService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    
    this.getCountryFromStorage();
    console.log(this.countryInStorage);
    this.getCountriesAPI();
    
  }

  async getCountryFromStorage() {
    this.countryInStorage = await this.mds.get('country');
  } 
  
  async getCountriesAPI() {
    let result = await this.mds.getCountriesList(this.options);
    console.log(result);
  }

  

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';


@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AllCountriesPage implements OnInit {

  countryInStorage:string = "";
  constructor(private mds: MyDataServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getCountryFromStorage();
    console.log(this.countryInStorage);
  }

  async getCountryFromStorage() {
    this.countryInStorage = await this.mds.get('country');
  }

  

}

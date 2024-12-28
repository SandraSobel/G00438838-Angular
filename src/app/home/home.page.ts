import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonSearchbar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyDataServiceService } from '../services/my-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html', 
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, RouterLink, IonButton, CommonModule, FormsModule,IonSearchbar],
})
export class HomePage {
  country:string="";
  constructor(private mds:MyDataServiceService) {}


  ngOnInit(){
    
  }

  async setCountry() {
    await this.mds.set("country", this.country);
  }
}

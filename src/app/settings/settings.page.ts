import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadioGroup,IonRadio]
})
export class SettingsPage implements OnInit {

  settingsValue:string = "";

  constructor(private mds: MyDataServiceService) { }

  ngOnInit() {    
  }
  ionViewWillEnter(){
    this.setDefaultUnit();    
  }

  async setMetricUnit() {
    await this.mds.setUnits("units", "Metric"); 
    this.settingsValue = "Metric";
  }

  async setImperialUnit(){
    await this.mds.setUnits("units", "Imperial");
    this.settingsValue = "Imperial";
  }

  async setStandardUnit(){
    await this.mds.setUnits("units", "Standard") ,
    this.settingsValue = "Standard"; 
  }

  async setDefaultUnit(){  
    const units:string = await this.mds.getUnits()
      if (units !== "") {
        this.settingsValue = units;
      } else {
        await this.mds.setUnits("units", "Metric");
        this.settingsValue = await this.mds.getUnits();
      }
    }
}



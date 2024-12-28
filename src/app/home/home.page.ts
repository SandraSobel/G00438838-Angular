import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton ,IonCol} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html', 
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, RouterLink, IonButton, CommonModule, FormsModule,IonCol],
})
export class HomePage {
  constructor() {}
}

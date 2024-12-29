import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private mds:MyDataServiceService) { }

  ngOnInit() {
  }

}

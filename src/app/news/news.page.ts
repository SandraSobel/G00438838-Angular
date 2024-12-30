import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { MyDataServiceService } from '../services/my-data-service.service';
import { HttpOptions } from '@capacitor/core';

//api key: pub_63737dcb893386948bba07842734f4473e638

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',  
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,IonCard,IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton]
})
export class NewsPage implements OnInit {

  //newsArray: any;
  apiKey: string = "pub_63737dcb893386948bba07842734f4473e638"; 
  countrySelected: any;  
  countrySelectedName:string = "";
  options: HttpOptions = {
    url: ""
  }
  newsArray:any;
  newsArray2:any;
  noNews:string ="No news found for" + this.countrySelectedName

  constructor(private mds:MyDataServiceService) { }

  ngOnInit() {
    
    this.countrySelected = []; 
    this.newsArray = [];
    this.newsArray2 = [];
    
  }

  /*everytime page is about to be displayed:store index array */
  ionViewWillEnter(){    
    this.getCountrySelectedName();
    this.setApiUrl();
    this.getNewsAPI();
}

  /*get country from array*/
  async getCountryFromLocalStorage() {
    this.countrySelected = await this.mds.getCountrySelected('countrySelected');
    console.log("This is getCountryIndex method, checking if array is returned from local storage" ); 
    console.log(this.countrySelected);
  }

  /*setApiURL*/
  async setApiUrl(){
    await this.getCountryFromLocalStorage();
    let urlStart:string = "https://newsdata.io/api/1/latest?"; 
    let urlApi:string ="apikey="+ this.apiKey;
    let urlAnd:string = "&";
    let urlCountry:string = "country=" + this.countrySelected[0].cca2;
    this.options = {
      url: urlStart + urlApi + urlAnd + urlCountry
    }
    console.log(urlStart + urlApi + urlAnd + urlCountry)
    console.log(this.options)
  }

  async getCountrySelectedName() {
    await this.getCountryFromLocalStorage(); 
    this.countrySelectedName = this.countrySelected[0].name.official;    
    console.log(this.countrySelectedName);
    console.log(this.noNews);
  }
  
  /*get all countries with all details from countries API*/
  async getNewsAPI() {
    await this.setApiUrl();
    let tempArray:[] =[];
    let result = await this.mds.getApiData(this.options);
    console.log(result.data);
     
    this.newsArray.push(result.data.results);
    this.newsArray = this.newsArray[0];
    
   /* for (let i=0; i<tempArray.lengh){
      this.newsArray.push({
        image: news.

      })*/
        
      
     
      
      console.log(this.newsArray);
      

   // } 
  }


}



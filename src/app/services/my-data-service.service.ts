import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class MyDataServiceService {

  constructor(private storage: Storage) {
    this.init();
   }

   async init() {
    const storage = await this.storage.create();
   }

   async setCountry(key:string, value:string) {
    await this.storage.set(key,value);
   }

   async getCountry(key:string){ 
    return await this.storage.get('country')
   }

   async setCountrySelected(key:string, value:any) {
    await this.storage.set(key,value);
   }

   async getCountrySelected(key:string){ 
    return await this.storage.get('countrySelected')
   }

   async getApiData(options: HttpOptions) {
    return await CapacitorHttp.get(options)
   }
}

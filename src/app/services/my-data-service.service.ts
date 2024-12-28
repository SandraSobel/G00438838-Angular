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

   async set(key:string, value:string) {
    await this.storage.set(key,value);
   }

   async get(key:string){ 
    return await this.storage.get('country')

   }


   async getCountriesList(options: HttpOptions) {
    return await CapacitorHttp.get(options)
   }
}

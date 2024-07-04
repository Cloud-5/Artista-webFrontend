import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UploadArtworksService {

  constructor() { }

addArtworkByArtist(formData:any){
  console.log('addArtworkByArtist',formData);
  return formData;
}



}

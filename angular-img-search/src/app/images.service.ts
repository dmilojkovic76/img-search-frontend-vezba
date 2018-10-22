import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  API_URL = "https://api.unsplash.com/search/photos/?query=";
  CLIENT_ID = "&client_id=4ed859e100f487b468f969258ab8719cf86608077837e3a783acd3cfc00c3e6a";

  search(searchTerm){
    const url = `${this.API_URL}${searchTerm}${this.CLIENT_ID}`;
    return this.http.get(url);
    
  }
}

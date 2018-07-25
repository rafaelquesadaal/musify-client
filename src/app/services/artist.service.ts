import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { CONFIG } from "./config";
import { UtilsService } from "./utils.service";
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  url: string = CONFIG.url;
  
  constructor(private utilsService: UtilsService, private http: HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeaderAutorizationHeader():any{
    let headersJson = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.utilsService.getToken()
      })
    };
    return headersJson;
  };

  addArtist(artist: Artist): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.post(`${this.url}artist`, artist, headersJson).pipe();
  }

  getArtists(page?: number): Observable<any>{
    if(!page) page = 1;
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.get<Artist[]>(`${this.url}artists/${page}`, headersJson).pipe();
  }

  getArtist(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.get<Artist>(`${this.url}artist/${id}`, headersJson).pipe();
  }

  updateArtist(id: string, artist: Artist): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.put(`${this.url}artist/${id}`, artist, headersJson).pipe();
  }

  deleteArtist(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.delete(`${this.url}artist/${id}`, headersJson).pipe();
  }
}

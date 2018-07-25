import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { CONFIG } from "./config";
import { UtilsService } from "./utils.service";
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  url: string = CONFIG.url;

  constructor(private utilsService: UtilsService, private http: HttpClient) { }

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeaderAutorizationHeader(): any{
    let headersJson = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': this.utilsService.getToken()
      })
    };
    return headersJson;
  }

  addSong(song: Song): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.post(`${this.url}song`, song, headersJson).pipe();
  }

  getSong(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.get<Song>(`${this.url}song/${id}`, headersJson).pipe();
  }

  getSongs(albumId?: string, page?: number): Observable<any>{
    //if(!page) page = 1;
    let headersJson = this.getHeaderAutorizationHeader();
    let param = (albumId != null) ? `/${albumId}` : '';
    return this.http.get<Song[]>(`${this.url}songs${param}`, headersJson).pipe();
  }

  updateSong(id: string, song: Song): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.put(`${this.url}song/${id}`, song, headersJson).pipe();
  }

  deleteSong(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.delete(`${this.url}song/${id}`, headersJson).pipe();
  }
}

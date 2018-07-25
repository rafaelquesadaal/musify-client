import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { CONFIG } from "./config";
import { UtilsService } from "./utils.service";
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
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

  addAlbum(album: Album): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.post(`${this.url}album`, album, headersJson).pipe();
  }

  getAlbum(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.get<Album>(`${this.url}album/${id}`, headersJson).pipe();
  }

  getAlbums(artistId?: string, page?: number): Observable<any>{
    if(!page) page = 1;
    let headersJson = this.getHeaderAutorizationHeader();
    let param = (artistId != null) ? `/${artistId}` : `?page=${page}`;
    return this.http.get<Album[]>(`${this.url}albums${param}`, headersJson).pipe();
  }

  updateAlbum(id: string, album: Album): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.put(`${this.url}album/${id}`, album, headersJson).pipe();
  }

  deleteAlbum(id: string): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.delete(`${this.url}album/${id}`, headersJson).pipe();
  }
}

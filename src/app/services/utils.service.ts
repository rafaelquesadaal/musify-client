import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { CONFIG } from "./config";
import { CurrentSong } from "../models/currentSong";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  identity;
  token: string;
  currentSong: CurrentSong;
  
  private emitUserUpdate = new Subject<any>();
  userUpdateEmitted$ = this.emitUserUpdate.asObservable();

  private emitSongUpdate = new Subject<any>();
  songUpdateEmitted$ = this.emitSongUpdate.asObservable();
  
  constructor() { }

  isLoggedIn(): boolean{
    return this.getIdentity() != null && this.getToken() != null;
  }
  
  getIdentity(): any{
    let identity = JSON.parse(localStorage.getItem('identity'));
    this.identity = (identity != null) ? identity : null;
    return this.identity;
  };

  getToken(): string{
    let token = localStorage.getItem('token');
    this.token = (token != null) ? token : null;
    return this.token;
  };

  setCurrentSong(currentSong: CurrentSong): void{
    localStorage.setItem('currentSong', JSON.stringify(currentSong));
    this.emitSongUpdate.next(currentSong);
  }

  getCurrentSong(): CurrentSong {
    let currentSong = JSON.parse(localStorage.getItem('currentSong'));
    this.currentSong = (currentSong != null) ? currentSong : new CurrentSong(null, null, null);
    return this.currentSong;
  }

  emitUpdate(updateUser: boolean) {
    this.emitUserUpdate.next(updateUser);
  }

  isAdmin(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    this.identity = (identity != 'undefined') ? identity : null;
    return this.identity != null && this.identity.role == CONFIG.adminRole ? true : false;
  }
}


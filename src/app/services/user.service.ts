import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { CONFIG } from "./config";
import { UtilsService } from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  identity;
  token;

  constructor(private utilsService: UtilsService, private http: HttpClient) {
    this.url = CONFIG.url;
  }

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  singup(user: any, gethash?: boolean): Observable<any>{
    if(gethash != null) user.gethash = gethash;
    return this.http.post(`${this.url}login`, user, this.httpOptions).pipe();
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.url}register`, user, this.httpOptions).pipe();
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
  
  updateUser(user: User): Observable<any>{
    let headersJson = this.getHeaderAutorizationHeader();
    return this.http.put(`${this.url}user/${user._id}`, user, headersJson).pipe();
  };
}

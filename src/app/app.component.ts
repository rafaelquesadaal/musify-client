import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from './models/user';
import { UtilsService } from "./services/utils.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Musify';
  /*user: User;
  identity;
  token;
  isLoggedIn: boolean;
*/
  constructor(private router: Router, private utilsService: UtilsService) {
    //this.user = new User('','','','','','','');
  }

  ngOnInit(){
    /*this.isLoggedIn = this.utilsService.isLoggedIn();
    this.identity = this.utilsService.getIdentity();
    this.token = this.utilsService.getToken();
    this.utilsService.userUpdateEmitted$.subscribe(
      updateUser => {
        if(updateUser){
          this.identity = this.utilsService.getIdentity();
          this.user = this.identity;
          this.isLoggedIn = this.utilsService.isLoggedIn();
        }
      }
    );*/
  }

  logout():void{
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.removeItem('currentSong');
    this.utilsService.emitUpdate(true);
    /*this.identity = null;
    this.token = null;
    this.user = new User('','','','','','ROLE_USER','');*/
    this.router.navigate(['/login']);
  }
}

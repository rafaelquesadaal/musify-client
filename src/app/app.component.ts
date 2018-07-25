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
  constructor(private router: Router, private utilsService: UtilsService) {
  }

  ngOnInit(){
  }

  logout():void{
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.removeItem('currentSong');
    this.utilsService.emitUpdate(true);
    this.router.navigate(['/login']);
  }
}

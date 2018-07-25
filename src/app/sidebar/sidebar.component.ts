import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { CONFIG } from "../services/config";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();
  identity;
  url: string = CONFIG.url;
  currentUrl: string;
  isLoggedIn: boolean;
  
  constructor(private router: Router, private utilsService: UtilsService) {
    router.events.subscribe(
      (_ : NavigationEnd) => {
        this.currentUrl = _.url;
      }
    );
  }

  ngOnInit() {
    this.isLoggedIn = this.utilsService.isLoggedIn();
    this.identity = this.utilsService.getIdentity();
    this.utilsService.userUpdateEmitted$.subscribe(
      updateUser => {
        if(updateUser){
          this.isLoggedIn = this.utilsService.isLoggedIn();
          this.identity = this.utilsService.getIdentity();
        }
      }
    );
  }

  onLogout(): void{
    this.logout.emit();
    this.isLoggedIn = false;
  }
}

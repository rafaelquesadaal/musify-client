import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Album } from "../models/album";
import { UtilsService } from "../services/utils.service";
import { AlbumService } from "../services/album.service";
import { CONFIG } from "../services/config";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  title: string = "Albums";
  albums: Album[] = [];
  url: string = CONFIG.url;
  page: number;
  next: number;
  prev: number;
  maxPage: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location, private utilsService: UtilsService, private albumService: AlbumService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      if(!params.page) this.page = 1;
      else {        
        this.page = +params.page;
        this.prev = this.page - 1;
        this.next = this.page + 1;
        this.maxPage = 2;
        if(this.prev == 0) this.prev = 1;
      }
      this.getAlbums();
    });
  }

  getAlbums(): void{
    this.albumService.getAlbums(null, this.page).subscribe(
      res => {
        if(!res.albums) return this.router.navigate(['/']);
        this.albums = res.albums;
        this.maxPage = Math.ceil(res.items / res.itemsPerPage);
        if(this.next > this.maxPage) this.next = this.maxPage;
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error);
        }
      }
    );
  }

  isAdmin(): boolean{
    return this.utilsService.isAdmin();
  }
}

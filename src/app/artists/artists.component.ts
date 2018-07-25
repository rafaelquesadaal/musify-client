import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Artist } from "../models/artist";
import { UtilsService } from "../services/utils.service";
import { ArtistService } from "../services/artist.service";
import { CONFIG } from "../services/config";

@Component({
  selector: 'app-artist',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  title: string = "Artists";
  artists: Artist[] = [];
  url: string = CONFIG.url;
  page: number;
  next: number;
  prev: number;
  maxPage: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location, private utilsService: UtilsService, private artistService: ArtistService) {
    this.next = 1;
    this.prev = 1;
  }

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
      this.getArtists();
    });
  }

  getArtists(): void{
    this.artistService.getArtists(this.page).subscribe(
      res => {
        if(!res.artists) return this.router.navigate(['/']);
        this.artists = res.artists;
        this.maxPage = Math.ceil(res.items / res.itemsPerPage);
        if(this.next > this.maxPage) this.next = this.maxPage;
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error.message);
        }
      }
    );
  }

  onDelete(id: string): void{
    this.artistService.deleteArtist(id).subscribe(
      res => {
        if(!res.artist) return this.router.navigate(['/']);
        this.getArtists();
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error.message);
        }
      }
    );
  }

  isAdmin(): boolean{
    return this.utilsService.isAdmin();
  }
}

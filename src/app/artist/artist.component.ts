import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Artist } from "../models/artist";
import { Album } from "../models/album";
import { UtilsService } from "../services/utils.service";
import { CONFIG } from "../services/config";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  errorMessage: string;
  message: string;
  artistId: string;
  url: string = CONFIG.url;
  albums: Album[];

  constructor(private artistService: ArtistService, private albumService: AlbumService, private utilsService: UtilsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.artistId = params.id;
      this.getArtist();
    });
  }

  getArtist(): void{
    this.artistService.getArtist(this.artistId).subscribe(
      res => {
        if(!res.artist) return this.router.navigate(['/']);
        this.artist = res.artist;
        this.getAlbums();
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error.message);
          this.router.navigate(['/']);
        }
      }
    );
  }

  getAlbums(): void{
    this.albumService.getAlbums(this.artist._id).subscribe(
      res => {
        if(!res.albums) return this.errorMessage = "There are no albums";
        this.albums = res.albums;
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
          //this.router.navigate(['/']);
        }
      }
    );
  }

  onDeleteAlbum(albumId: string): void{
    this.albumService.deleteAlbum(albumId).subscribe(
      res => {
        if(!res.album) return this.errorMessage = "Error deleting album";
        this.getAlbums();
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
        }
      }
    );
  }
  
  isAdmin(): boolean{
    return this.utilsService.isAdmin();
  }
}

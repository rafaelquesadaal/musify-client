import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from "../services/utils.service";
import { ArtistService } from "../services/artist.service";
import { AlbumService } from "../services/album.service";
import { CONFIG } from "../services/config";
import { Album } from "../models/album";

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  title:string = "Add album";
  album: Album;
  errorMessage: string;
  message: string;
  artistId: string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private artistService: ArtistService, private utilsService: UtilsService, private albumService: AlbumService, private route: ActivatedRoute, private router: Router) {
    this.album = new Album('', '', '', (new Date()).getFullYear(), '', '');
  }

  ngOnInit() {    
    this.route.params.subscribe( params => {
      this.artistId = params.artistId;
      this.album.artist = this.artistId;
    });
  }

  onSubmit(): void {
    this.albumService.addAlbum(this.album).subscribe(
      res => {
        if(!res.album) return this.errorMessage = "The album could not be saved";
        this.message = "Album added";
        this.router.navigate(['/edit-album', res.album._id]);
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

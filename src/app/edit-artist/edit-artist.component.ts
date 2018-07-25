import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArtistService } from "../services/artist.service";
import { UploadService } from "../services/upload.service";
import { CONFIG } from "../services/config";
import { Artist } from "../models/artist";

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {
  title: string = "Edit artist";
  artist: Artist;
  errorMessage: string;
  message: string;
  artistId: string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private artistService: ArtistService, private uploadService: UploadService, private route: ActivatedRoute, private router: Router) {
    this.artist = new Artist('', '', '', '');
  }

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
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error.message);
          this.router.navigate(['/']);
        }
      }
    );
  }

  onFileChange(file: any): void {
    this.filesToUpload = <Array<File>> file.target.files;
  }

  onSubmit(): void{
    this.artistService.updateArtist(this.artistId, this.artist).subscribe(
      res => {
        if(!res.artist) return this.errorMessage = "The artists could not be updated";
        if(this.filesToUpload){ 
          this.uploadService.uploadFile('artist', this.artistId, [], this.filesToUpload, 'image').then(
            result => {
              this.message = "Artist updated";
              this.router.navigate(['/artists/1']);
            }, err => {
              this.errorMessage = err.message;
            }
          );
        } else {
          this.message = "Artist updated";
          this.router.navigate(['/artists/1'], res.artist._id);
        }
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumService } from "../services/album.service";
import { UploadService } from "../services/upload.service";
import { CONFIG } from "../services/config";
import { Album } from "../models/album";

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {
  title: string = "Edit album";
  album: Album;
  errorMessage: string;
  message: string;
  albumId: string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private albumService: AlbumService, private uploadService: UploadService, private route: ActivatedRoute, private router: Router) {
    this.album = new Album('', '', '', 0, '', '');
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.albumId = params.albumId;
      this.getAlbum();
    });
  }

  
  getAlbum(): void{
    this.albumService.getAlbum(this.albumId).subscribe(
      res => {
        if(!res.album) return this.router.navigate(['/']);
        this.album = res.album;
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
          this.router.navigate(['/']);
        }
      }
    );
  }

  onFileChange(file: any): void {
    this.filesToUpload = <Array<File>> file.target.files;
  }

  onSubmit(): void{
    this.albumService.updateAlbum(this.albumId, this.album).subscribe(
      res => {
        if(!res.album) return this.errorMessage = "The album could not be updated";
        this.message = "Album updated";
        if(this.filesToUpload){ 
          this.uploadService.uploadFile('album', this.albumId, [], this.filesToUpload, 'image').then(
            result => {
              if(result.image) this.album.image = result.image;
              this.router.navigate(['/artist', res.album.artist]);
            }, err => {
              console.log('Error');
            }
          );
        } else {
          this.router.navigate(['/artist', res.album.artist]);
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

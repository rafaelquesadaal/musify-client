import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from "../services/utils.service";
import { UploadService } from "../services/upload.service";
import { SongService } from "../services/song.service";
import { CONFIG } from "../services/config";
import { Song } from "../models/song";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  title:string = "Add song";
  song: Song;
  errorMessage: string;
  message: string;
  albumId: string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private utilsService: UtilsService, private songService: SongService, private uploadService: UploadService, private route: ActivatedRoute, private router: Router) {
    this.song = new Song(1, '', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.albumId = params.albumId;
      this.song.album = this.albumId;
    });
  }

  onSubmit(): void {
    this.songService.addSong(this.song).subscribe(
      res => {
        if(!res.song) return this.errorMessage = "The song could not be saved";
        this.message = "Song added";
        if(this.filesToUpload){ 
          this.uploadService.uploadFile('song', res.song._id, [], this.filesToUpload, 'song').then(
            result => {
              if(result.file) this.song.file = result.song.file;
              this.router.navigate(['/album', res.song.album]);
            }, err => {
              console.log('Error');
            }
          );
        } else {
          this.router.navigate(['/album', res.song.album]);
        }        
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
        }
      }
    );
  }
  

  onFileChange(file: any): void {
    this.filesToUpload = <Array<File>> file.target.files;
  }

  isAdmin(): boolean{
    return this.utilsService.isAdmin();
  }

}

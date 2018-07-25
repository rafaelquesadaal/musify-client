import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SongService } from "../services/song.service";
import { UploadService } from "../services/upload.service";
import { CONFIG } from "../services/config";
import { Song } from "../models/song";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  title: string = "Edit song";
  song: Song;
  errorMessage: string;
  message: string;
  songId: string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private songService: SongService, private uploadService: UploadService, private route: ActivatedRoute, private router: Router) {
    this.song = new Song(1, '', '', '', '');
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.songId = params.id;
      this.getSong();
    });
  }

  getSong(): void{
    this.songService.getSong(this.songId).subscribe(
      res => {
        if(!res.song) return this.router.navigate(['/']);        
        this.song = res.song;
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
    this.songService.updateSong(this.songId, this.song).subscribe(
      res => {
        if(!res.song) return this.errorMessage = "The song could not be updated";
        this.message = "Song updated";
        if(this.filesToUpload){ 
          this.uploadService.uploadFile('song', this.songId, [], this.filesToUpload, 'song').then(
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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Album } from "../models/album";
import { CurrentSong } from "../models/currentSong";
import { Song } from "../models/song";
import { CONFIG } from "../services/config";
import { AlbumService } from "../services/album.service";
import { SongService } from "../services/song.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  errorMessage: string;
  message: string;
  albumId: string;
  url: string = CONFIG.url;
  album: Album;
  songs: Song[];
  currentSong : CurrentSong;
  constructor(private albumService: AlbumService, private songService: SongService, private utilsService: UtilsService, private route: ActivatedRoute, private router: Router) {
    this.currentSong = this.utilsService.getCurrentSong();
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.albumId = params.id;
      this.getAlbum();
    });
  }

  getAlbum(): void{
    this.albumService.getAlbum(this.albumId).subscribe(
      res => {
        if(!res.album) return this.router.navigate(['/']);
        this.album = res.album;
        this.getSongs();
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          console.log(errorResponse.error.message);
          this.router.navigate(['/']);
        }
      }
    );
  }

  getSongs(): void{
    this.songService.getSongs(this.album._id).subscribe(
      res => {
        if(!res.songs) return this.errorMessage = "There are no songs";
        this.songs = res.songs;
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
          //this.router.navigate(['/']);
        }
      }
    );
  }

  onDeleteSong(songId: string): void {
    this.songService.deleteSong(songId).subscribe(
      res => {
        if(!res.song) return this.router.navigate(['/']);
        this.getSongs();
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.errorMessage = errorResponse.error.message;
        }
      }
    );
  }

  play(song: any): void{
    let songUrl = `${this.url}song/file/${song.file}`;
    let imageUrl = (song.album.image != 'null') ? `${this.url}album/file/${song.album.image}` : null;
    this.currentSong = new CurrentSong(songUrl, imageUrl, song);
    this.utilsService.setCurrentSong(this.currentSong);
  }

  isAdmin(): boolean{
    return this.utilsService.isAdmin();
  }

}

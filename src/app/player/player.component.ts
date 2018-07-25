import { Component, OnInit } from '@angular/core';

import { Song } from "../models/song";
import { CurrentSong } from "../models/currentSong";
import { CONFIG } from "../services/config";
import { SongService } from "../services/song.service";
import { UtilsService } from "../services/utils.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  url: string = CONFIG.url;
  song: Song;
  currentSong: CurrentSong;
  imagePath: string = CONFIG.defaultImagePath;
  isLoggedIn: boolean;

  constructor(private songService: SongService, private utilsService: UtilsService) {
    this.song = new Song(1, '', '', '', '');
  }

  ngOnInit() {
    this.isLoggedIn = this.utilsService.isLoggedIn();
    this.utilsService.userUpdateEmitted$.subscribe(
      updateUser => {
        if(updateUser){
          this.isLoggedIn = this.utilsService.isLoggedIn();
        }
      }
    );
    this.currentSong = this.utilsService.getCurrentSong();
    this.imagePath = (this.currentSong && this.currentSong.imageUrl != null) ? this.currentSong.imageUrl : CONFIG.defaultImagePath;
    this.utilsService.songUpdateEmitted$.subscribe(
      currentSong => {
        if(currentSong){
          this.currentSong = this.utilsService.getCurrentSong();
          this.imagePath = (this.currentSong && this.currentSong.imageUrl != null) ? this.currentSong.imageUrl : CONFIG.defaultImagePath;
          this.playSong();
        }
      }
    );
  }

  playSong():void{
    let audio = document.getElementById('audio-player') as any;
    audio.load();
    audio.play();
  }
}

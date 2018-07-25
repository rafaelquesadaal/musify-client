import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UtilsService } from "../services/utils.service";
import { ArtistService } from "../services/artist.service";
import { Artist } from "../models/artist";

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  title: string = "Add new artist";
  artist: Artist;
  errorMessage: string;
  message: string;

  constructor(private artistService: ArtistService, private utilsService: UtilsService, private router: Router) {
    this.artist = new Artist('', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(): void{
    this.artistService.addArtist(this.artist).subscribe(
      res => {
        if(!res.artist) return this.errorMessage = "The artist could not be saved";
        this.artist = new Artist('', '', '', '');
        this.router.navigate(['/edit-artist', res.artist._id]);
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

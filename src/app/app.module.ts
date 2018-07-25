import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArtistsComponent } from './artists/artists.component';
import { HomeComponent } from './home/home.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { ArtistComponent } from './artist/artist.component';
import { AddAlbumComponent } from './add-album/add-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { AlbumComponent } from './album/album.component';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { AlbumsComponent } from './albums/albums.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditUserComponent,
    SidebarComponent,
    ArtistsComponent,
    HomeComponent,
    AddArtistComponent,
    EditArtistComponent,
    ArtistComponent,
    AddAlbumComponent,
    EditAlbumComponent,
    AlbumComponent,
    AddSongComponent,
    EditSongComponent,
    AlbumsComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

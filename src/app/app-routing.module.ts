import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ArtistsComponent } from "./artists/artists.component";
import { HomeComponent } from "./home/home.component";
import { AddArtistComponent } from "./add-artist/add-artist.component";
import { EditArtistComponent } from "./edit-artist/edit-artist.component";
import { ArtistComponent } from "./artist/artist.component";
import { AddAlbumComponent } from "./add-album/add-album.component";
import { AlbumsComponent } from "./albums/albums.component";
import { EditAlbumComponent } from "./edit-album/edit-album.component";
import { AlbumComponent } from "./album/album.component";
import { AddSongComponent } from "./add-song/add-song.component";
import { EditSongComponent } from "./edit-song/edit-song.component";

import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'artists/:page', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'artist/:id', component: ArtistComponent, canActivate: [AuthGuard] },
  { path: 'add-artist', component: AddArtistComponent, canActivate: [AuthGuard] },
  { path: 'edit-artist/:id', component: EditArtistComponent, canActivate: [AuthGuard && RoleGuard] },
  { path: 'add-album/:artistId', component: AddAlbumComponent, canActivate: [AuthGuard] },
  { path: 'edit-album/:albumId', component: EditAlbumComponent, canActivate: [AuthGuard && RoleGuard] },
  { path: 'albums/:page', component: AlbumsComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuard] },
  { path: 'add-song/:albumId', component: AddSongComponent, canActivate: [AuthGuard] },
  { path: 'edit-song/:id', component: EditSongComponent, canActivate: [AuthGuard && RoleGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Song } from "./song";

export class CurrentSong{
    constructor(
        public songUrl: string,
        public imageUrl: string,
        public song: Song
    ){}
}
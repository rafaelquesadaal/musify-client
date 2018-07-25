import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UtilsService } from "../services/utils.service";
import { UserService } from "../services/user.service";
import { UploadService } from "../services/upload.service";
import { User } from "../models/user";
import { CONFIG } from "../services/config";
import { resolve, reject } from 'q';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  title: string;
  user: User;
  identity;
  updateMessage:string;
  updateError:string;
  filesToUpload: Array<File>;
  url: string = CONFIG.url;

  constructor(private utilsService: UtilsService, private userService: UserService, private uploadService: UploadService) { 
    this.title = 'Edit user information';
    this.identity = this.utilsService.getIdentity();
    this.user = this.identity;
  }

  ngOnInit() {
  }

  onUpdate(): void{
    this.userService.updateUser(this.user).subscribe(
      res => {
        if(!res.user) return this.updateError = "The user was not updated"; 
        localStorage.setItem('identity', JSON.stringify(this.user));
        if(this.filesToUpload) this.uploadService.uploadFile('user', this.user._id, [], this.filesToUpload, 'image').then(
          result => {
            this.user.image = result.image; 
            localStorage.setItem('identity', JSON.stringify(this.user));
            this.utilsService.emitUpdate(true);
            this.updateMessage = "Changes saved successfully";
          }, err => {
            let error = JSON.parse(err)
            this.updateError = error.message;
          }
        );
        else{
          this.utilsService.emitUpdate(true);
          this.updateMessage = "Changes saved successfully";
        }
      }, err => {
        let errorResponse = <any>err;
        if(errorResponse != null) {
          this.updateError = errorResponse.error.message;
        }
      }
    );
  };

  onFileChange(file: any): void {
    this.filesToUpload = <Array<File>> file.target.files;
  }
}

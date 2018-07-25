import { Injectable } from '@angular/core';

import { CONFIG } from "../services/config";
import { UtilsService } from "../services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseUrl: string = CONFIG.url;

  constructor(private utilsService: UtilsService) { }

  uploadFile(url: string, id: string, params: Array<string>, files: Array<File>, name: string): Promise<any> {
    let token = this.utilsService.getToken();
    let baseUrl = this.baseUrl;
    return new Promise(function(resolve, reject){
      var formData = new FormData();
      var xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
          if(xhr.status == 200) resolve(JSON.parse(xhr.response));
          else reject(xhr.response);
        }
      };
      xhr.open('POST', `${baseUrl}${url}/file/${id}`, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}

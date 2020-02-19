import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSendService {

  constructor() { }

  FileToFormData(file: any, data: any, cle: string){
    var formData = new FormData();
    formData.append("photo", file);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append(cle, JSON.stringify(data));
    return formData;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiHttpService } from './api.http.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiHttp: ApiHttpService) { }

  AddNewTraining(formData: any) {
    return this.apiHttp.post(environment.baseUrlTraining + 'AddNewTraining', formData);
  }

  GetNomTraining(libelle: any){
    return this.apiHttp.get(environment.baseUrlTraining + 'GetNomTraining/'+ libelle);
  }

  GetTrainingBySalle(){
    return this.apiHttp.get(environment.baseUrlTraining + 'GetTrainingBySalle');
  }

  GetEntraineurBySalle(){
    return this.apiHttp.get(environment.baseUrlTraining + 'Entraineurs');
  }

  DownloadFile(fileName: any){
    return this.apiHttp.get(environment.baseUrlTraining + 'Download/'+fileName, { responseType: 'blob'});
  }
  
}

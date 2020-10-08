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

  AddParticipantsProgramme(formData: any){
    return this.apiHttp.post(environment.baseUrlTraining + 'AddParticipantsProgramme', formData);
  }

  GetAllProgrammes(){
    return this.apiHttp.get(environment.baseUrlTraining + 'GetAllProgrammes');
  }

  GetAllAbonnesProgrammes(ProgrammeID: any, distinct: any){
    return this.apiHttp.get(environment.baseUrlTraining + 'GetAllAbonnesProgrammes/'+ProgrammeID+"/"+distinct);
  }

  AddNewTraining(formData: any) {
    return this.apiHttp.post(environment.baseUrlTraining + 'AddNewTraining', formData);
  }

  AddProgrammeTraining(formData: any){
    return this.apiHttp.post(environment.baseUrlTraining + 'AddProgrammeTraining', formData);
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

  AnnulerParticipantProgramme(clientId: any, programmeId: any){
    return this.apiHttp.delete(environment.baseUrlTraining + 'AnnulerParticipantProgrammes/'+programmeId+"/"+clientId);

  }

  PresentParticipantProgrammes(clientId: any, programmeId: any){
    return this.apiHttp.put(environment.baseUrlTraining + 'PresentParticipantProgrammes/'+programmeId+"/"+clientId);

  }

  PayeParticipantProgrammes(clientId: any, programmeId: any, montant: any){
    return this.apiHttp.put(environment.baseUrlTraining + 'PayeParticipantProgrammes/'+programmeId+"/"+clientId+"/"+montant);

  }
  
}

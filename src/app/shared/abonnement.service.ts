import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHttpService } from './api.http.service';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  constructor(private http: ApiHttpService) { }

  AddAbonnement(formData: any): Observable<Object> {
    return this.http.post(environment.baseUrlAbonne + 'Abonne', formData);
  }

  GetAbonnementSalle(idSalle: any): Observable<Object>{
    return this.http.get(environment.baseUrlParamettrage + 'Abonnements/'+idSalle);
  }

  NewAbonnementSalle(data: any): Observable<Object>{
    return this.http.post(environment.baseUrlParamettrage + 'AbonnementSalle', data);
  }

  MesAbonnesPresents(): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'AbonnesPresents');
  }

  MesAbonnesPresentsToday(): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'AbonnesPresentsToday');
  }

  MesAbonne(): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'Abonnes');
  }
  MesAbonneSalle(id: any): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'AbonnesSalle/'+id);
  }

  MesGerantSalle(id: any): Observable<Object> {
    return this.http.get(environment.baseUrlParamettrage + 'GerantSalle/'+id);
  }

  GetSalleGym(): Observable<Object> {
    return this.http.get(environment.baseUrlParamettrage + 'GetSalleGym/');
  }

  GetClientAbonne(id: any): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'Abonnes/'+id, {observe: 'response'});
  }

  SetClientPresent(id: any): Observable<Object> {
    return this.http.get(environment.baseUrlAbonne + 'FichePresent/'+id, {observe: 'response'});
  }

  UpdateClientPresent(id: any): Observable<Object> {
    return this.http.put(environment.baseUrlAbonne + 'UpdateFichePresent/'+id, {observe: 'response'});
  }
}

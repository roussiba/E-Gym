import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  constructor(private http: HttpClient) { }

  CheckTelephone(telephone: any): Observable<Object>{
    return this.http.get<Object>(environment.baseUrlProprietaire+"CheckTelephone/"+ telephone, {observe: 'response'});
  }

  AddPropriete(formData: any): Observable<Object> {
    return this.http.post<Object>(environment.baseUrlUser + 'Register', formData);
  }

  GetGerant(id: any): Observable<Object> {
    return this.http.get(environment.baseUrlParamettrage + 'GetGerant/'+id);
  }

  UpdateGerant(gerant: any, id: any){
    return this.http.put(environment.baseUrlParamettrage + 'UpdateGerant/'+id, gerant)
  }
}

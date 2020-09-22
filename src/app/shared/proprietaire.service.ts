import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHttpService } from './api.http.service';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  constructor(private http: ApiHttpService) { }

  CheckTelephone(telephone: any){
    return this.http.get(environment.baseUrlProprietaire+"CheckTelephone/"+ telephone, {observe: 'response'});
  }

  AddPropriete(formData: any) {
    return this.http.post(environment.baseUrlUser + 'Register', formData);
  }

  GetGerant(id: any){
    return this.http.get(environment.baseUrlParamettrage + 'GetGerant/'+id);
  }

  UpdateGerant(gerant: any, id: any){
    return this.http.put(environment.baseUrlParamettrage + 'UpdateGerant/'+id, gerant)
  }
}

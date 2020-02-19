import { Injectable } from '@angular/core';
import { ApiHttpService } from './api.http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiHttp: ApiHttpService) { }

  addCorpulence(data: any){
    return this.apiHttp.post(environment.baseUrlParamettrage +"AddCorpulence", data);
  }
}

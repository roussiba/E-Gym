import { Injectable } from '@angular/core';
import { ApiHttpService } from './api.http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SallegymService {

  constructor(private apiservice: ApiHttpService) { }

  public addSalleGym(formData: any): Observable<Object>{
    return this.apiservice.post(environment.baseUrlParamettrage.concat("SalleGym"), formData);
  }

  public mesSalleGym(): Observable<Object>{
    return this.apiservice.get(environment.baseUrlParamettrage.concat("MesSalleGym"));
  }

  GetBilan(): Observable<Object> {
    return this.apiservice.get(environment.baseUrlParamettrage.concat("GainToDay"));
  }

  ConvertToMoney(money: any) {
    const formatter = new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'CFA',
        minimumFractionDigits: 0
    });
    return formatter.format(parseInt(money));
  }
}

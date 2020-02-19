// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient
  ) { }

  public get(url: string, options?: any): Observable<Object> {
    return this.http.get<Object>(url, options);
  }
  
  public post(url: string, data: any, options?: any): Observable<Object>  {
    return this.http.post<Object>(url, data, options);
  }

  public put(url: string, options?: any): Observable<Object>  {
    return this.http.put<Object>(url, options);
  }

  public delete(url: string, options?: any): Observable<Object>  {
    return this.http.delete<Object>(url, options);
  }
  
  public erreurMessage (erreur: HttpErrorResponse) {
    return Observable.throw(erreur.message || 'Serve Error');
  }
}
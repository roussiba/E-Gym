import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHttpService } from './api.http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private apiHttp: ApiHttpService) { }

  login(formData: any): Observable<Object> {
    return this.apiHttp.post(environment.baseUrlUser + 'Login', formData);
  }

  register(User: any): Observable<Object> {
    return this.apiHttp.post(environment.baseUrlUser + 'Register', User);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log('payload', payLoad);
    const userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole === element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  getRoleUser(){
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return payLoad.role;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  rmoveToken() {
    localStorage.removeItem('token');
  }
}

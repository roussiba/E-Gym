import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { routingLink } from '../shared/routing.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private service: LoginService, private toats: ToastrService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null) {
      const roles = next.data['permittedRoles'] as Array<string>;
      if (roles) {
        if (this.service.roleMatch(roles)) { return true; } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
      return true;
    } else {
      this.toats.warning("Probléme de token");
      this.router.navigate([routingLink.routeLogin]);
      return false;
    }

  }
}

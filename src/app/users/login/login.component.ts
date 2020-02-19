import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService, private toastr: ToastrService, private router: Router) { }

  userLogin = {
    UserName: '',
    Password: ''
  };

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl(routingLink.routeDashboard);
    }
  }

  hide = true;        

  onSubmit(formUser: NgForm) {
    console.log(formUser);
    this.login.login(formUser.value).subscribe((data: any) => {
      console.log(data.token);
      this.login.setToken(data.token);
      this.router.navigate([routingLink.routeDashboard]);
    },
    err => {
      console.log(err);
      if (err.status === 400) {
        this.toastr.info(err.error.message);
      } else {
        this.toastr.warning('Erreur inattendu. Veuillez vous reconnecter.');
      }
    });
  }

}

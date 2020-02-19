import { Component, OnInit } from '@angular/core';
import { routingLink } from 'src/app/shared/routing.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }

  LogOut() {
    this.service.rmoveToken();
    this.router.navigate([routingLink.routeLogin]);
  }
}

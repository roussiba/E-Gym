import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { roleUser } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role : any;
  isProprietaire: boolean;
  isGerant: boolean;

  constructor(private login: LoginService) { }

  ngOnInit() {
    this.role = this.login.getRoleUser();
    this.isProprietaire = false;
    this.isGerant = false;
    if(this.role === roleUser.Proprietaire){
      this.isProprietaire = true;
    }else{
      if(this.role === roleUser.Gerant){
        this.isGerant = true;
      }
    }
  }
}

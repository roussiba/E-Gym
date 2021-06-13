import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private service: LoginService) { }

  ngOnInit() {
    this.getUserConnect();
  }

  getUserConnect(){
    this.service.getUserConnect().subscribe(
      data => {
        console.log(this.user);
        this.user = data;
        console.log(this.user);
      }, 
      erreur => {
        console.log(erreur);
      }
    );
  }

}

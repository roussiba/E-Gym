import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { DialogAlert } from '../abonnee/abonnee.component';
import { MatDialog } from '@angular/material/dialog';
import { AbonnementService } from 'src/app/shared/abonnement.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideInAnimation]
})
export class DashboardComponent implements OnInit {

  constructor(private service: LoginService, private router: Router, 
    public dialog: MatDialog, private abonnementService: AbonnementService) { }

  textDialog: any;
  montantAbonnement: any;

  ngOnInit() {
    this.getSalleGym();
  }

  getSalleGym(){
    this.abonnementService.GetSalleGym().subscribe(
      data => {
        var response:any = data;
        this.montantAbonnement = response.prixPassager;
      },
      error => {
        this.montantAbonnement = 0;
      }
    );
  }

  openDialog() {
    
    this.textDialog = "Client Passager !";
    const dialogRef = this.dialog.open(DialogAlert, {
      data: { textDialog: this.textDialog },
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  LogOut() {
    this.service.rmoveToken();
    this.router.navigate([routingLink.routeLogin]);
  }
}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';
import { routingLink, roleUser } from 'src/app/shared/routing.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { DialogAlert, AbonneeComponent } from '../abonnee/abonnee.component';
import { MatDialog } from '@angular/material/dialog';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { SallegymService } from 'src/app/shared/sallegym.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideInAnimation]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    console.log("hello --> ", this.hello);
  }

  constructor(private service: LoginService, private router: Router, 
    public dialog: MatDialog, 
    private abonnementService: AbonnementService,
    private toast: ToastrService, private salleService: SallegymService) { }

    @ViewChild("AbonneeComponent", {static: false}) hello: AbonneeComponent;

  textDialog: any;
  montantAbonnement: any;
  recetteTotal: any;
  countPassager: any;
  countPresent: any;
  isProprietaire: boolean;

  ngOnInit() {
    this.getSalleGym();
    this.recetteTotal = 0;
    this.isProprietaire = this.service.getAccess(roleUser.Proprietaire);
  }

  getSalleGym(){
    this.salleService.GetBilan().subscribe(
      data => {
        var response:any = data;
        this.montantAbonnement = response.prixPassager;
        this.recetteTotal = response.montantTotal;
        this.countPassager = response.countPassager;
        this.countPresent = response.countPresent;
      },
      error => {
        this.montantAbonnement = 0;
      }
    );
  }

  openDialog() {
    
    this.textDialog = "Client Passager !";
    const dialogRef = this.dialog.open(DialogAlert, {
      data: { textDialog: this.textDialog, montant: this.montantAbonnement },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result : ', result);
      this.abonnementService.AddClientPassager(result.montant).subscribe(
        data => {
          this.recetteTotal += result.montant;  
          this.countPassager += 1; 
          this.toast.info("Abonnement client enregistré !", "Information",
          {
            closeButton : true,
            progressBar : true,
            positionClass : 'toast-top-center',
            progressAnimation: 'increasing'
          })
        }
      );
    });
  }

  openMembres(){
    this.router.navigate([routingLink.routeMembres, 0]);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  LogOut() {
    this.service.rmoveToken();
    this.router.navigate([routingLink.routeLogin]);
  }
}

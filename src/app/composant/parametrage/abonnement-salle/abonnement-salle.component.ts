import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewAbonnementSalleComponent } from '../new-abonnement-salle/new-abonnement-salle.component';

@Component({
  selector: 'app-abonnement-salle',
  templateUrl: './abonnement-salle.component.html',
  styleUrls: ['./abonnement-salle.component.css']
})
export class AbonnementSalleComponent implements OnInit {

  idSalle: any;
  abonnementSalles: any;
  constructor(private service: AbonnementService,
     private toats: ToastrService, 
     private activedRoute: ActivatedRoute,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.idSalle = this.activedRoute.snapshot.params.id;
    if(this.idSalle !== null){
      this.GetAbonnementSalle(this.idSalle);
    }
  }

  openNewAbonnement() {
    console.log('this.idSalle ',this.idSalle);
    const dialogRef = this.dialog.open(NewAbonnementSalleComponent, {
      data: { SalleId: this.idSalle },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result annuler`);
    });
  }

  GetAbonnementSalle(id: any){
    this.service.GetAbonnementSalle(id).subscribe(
      data => {
        console.log("data ----> ", data);
        this.abonnementSalles = data;
      },
      erreur => {
        this.toats.warning("Veuillez réactualiser la page svp !","Information");
      }
    );
  }

}

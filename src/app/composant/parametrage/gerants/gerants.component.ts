import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-gerants',
  templateUrl: './gerants.component.html',
  styleUrls: ['./gerants.component.css']
})
export class GerantsComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe','actions'];
  dataSource : any;
  id: any;
  mesGerants: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private service: AbonnementService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id == null){
      this.router.navigate([routingLink.routeClientAbonnes]);
    }else{
      this.MesGerantSalle();
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.mesGerants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  UpdateGerant(idGerant: any){
    this.router.navigate([routingLink.routeGerant, {id: this.id, idGerant: idGerant  }])
  }

  MesGerantSalle(){
    this.service.MesGerantSalle(this.id).subscribe(
      data => {
        this.mesGerants = data;
        console.log("this.mesGerants --> ",this.mesGerants);
      },
      error => {
        this.toastr.warning("Veuillez réactualiser la page svp !");
      }
    );
  }

}
export interface PeriodicElement {
  nom: string;
  prenom: string;
  telephone: string;
  sexe: string;
}
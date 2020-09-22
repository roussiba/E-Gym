import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-entraineurs',
  templateUrl: './entraineurs.component.html',
  styleUrls: ['./entraineurs.component.css']
})
export class EntraineursComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe','actions'];
  dataSource : any;
  id: any;
  mesEntraineurs: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private service: AbonnementService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id == null){
      this.router.navigate([routingLink.routeClientAbonnes]);
    }else{
      this.MesEntraineurSalle();
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.mesEntraineurs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  UpdateEntraineur(idGerant: any){
    this.router.navigate([routingLink.routeEntraineur, {id: this.id, idEntraineur: idGerant  }])
  }

  MesEntraineurSalle(){
    this.service.MesEntraineursSalle(this.id).subscribe(
      data => {
        this.mesEntraineurs = data;
        console.log("this.mesEntraineurs --> ",this.mesEntraineurs);
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
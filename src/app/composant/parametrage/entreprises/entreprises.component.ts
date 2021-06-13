import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { routingLink } from 'src/app/shared/routing.service';
import { PeriodicElement } from '../parametrage.component';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'adresse', 'abonnement','actions'];
  dataSource : any;
  id: any;
  mesEntreprises: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private service: AbonnementService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id == null){
      this.router.navigate([routingLink.routeClientAbonnes]);
    }else{
      this.MesEntreprise();
      this.dataSource = new MatTableDataSource<Element>(this.mesEntreprises);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  MesEntreprise(){

  }

}

export interface Element {
  nom: string;
  adresse: string;
  abonnement: string;
}

import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-client-gym',
  templateUrl: './client-gym.component.html',
  styleUrls: ['./client-gym.component.css']
})
export class ClientGymComponent implements OnInit {

  mesAbonnes: any;
  id: any;

  constructor(private abonne : AbonnementService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id != null){
      this.getMesAbonnes(this.id);
    }else{
      this.router.navigate([routingLink.routeClientAbonnes]);
    }
  }

  getMesAbonnes(id: any){
    this.abonne.MesAbonneSalle(id).subscribe(
      data => {
        this.mesAbonnes = data;
      },
      error => {
        this.toastr.warning("Veuillez réactualiser la page svp !")
      }
    );
  }


}

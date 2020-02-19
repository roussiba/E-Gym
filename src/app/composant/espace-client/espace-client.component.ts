import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { routingLink } from 'src/app/shared/routing.service';
import { MatDialog } from '@angular/material';
import { CorpulenceComponent } from '../corpulence/corpulence.component';

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit {

  id: any;
  clientGym: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
     private toast: ToastrService, private abonneService: AbonnementService,
     public dialog: MatDialog) { 

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id != null){
      this.GetAbonneById(this.id);
    }else{
      this.router.navigate([routingLink.routeClientAbonnes]);
    }
  }

  GetAbonneById(id: any){
    this.abonneService.GetClientAbonne(id).subscribe(
      data =>{
        let result:any = data;
        this.clientGym = result.body;
        console.log(this.clientGym);
      },
      error => {
        if(error.status === 404){
          this.toast.warning("Client non trouve");
          this.router.navigate([routingLink.routeClientAbonnes]);
        }
      }
    );
  }

  openCorpulence(){
    const dialoRef = this.dialog.open(CorpulenceComponent, {
      data: {ClientId : this.id}
    });

    dialoRef.afterClosed().subscribe(data => {
      console.log(`Dialog annuler`);
    });
  }

}

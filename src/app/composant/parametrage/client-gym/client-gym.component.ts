import { Component, OnInit } from '@angular/core';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-client-gym',
  templateUrl: './client-gym.component.html',
  styleUrls: ['./client-gym.component.css']
})
export class ClientGymComponent implements OnInit {

  searchPrenom: any;
  mesAbonnes: any;
  tempMesAbonnes: any=[];

  item: any;
  id: any;
  localUrl: any = [];

  constructor(private sanitizer:DomSanitizer,private abonne : AbonnementService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id != null){
      this.getMesAbonnes(this.id);
    }else{
      this.router.navigate([routingLink.routeClientAbonnes]);
    }
  }

  Search(){
    console.log(this.searchPrenom);
    this.mesAbonnes = this.tempMesAbonnes;
    if(this.searchPrenom !== ""){
      this.mesAbonnes = this.mesAbonnes.filter(s => s.prenom.toLowerCase().includes(this.searchPrenom.toLowerCase()) 
                                                 || s.nom.toLowerCase().includes(this.searchPrenom.toLowerCase())
                                                 || (s.nom+" "+s.prenom).toLowerCase().includes(this.searchPrenom.toLowerCase())
                                                 || s.telephone.toLowerCase().includes(this.searchPrenom.toLowerCase()));
    }
  }

  getMesAbonnes(id: any){
    this.abonne.MesAbonneSalle(id).subscribe(
      data => {
        this.mesAbonnes = data;
        this.mesAbonnes.forEach(element => {
          console.log("element ", element);
          this.Download(element.photo);
        });
        this.tempMesAbonnes = this.mesAbonnes;
      },
      error => {
        this.toastr.warning("Veuillez réactualiser la page svp !")
      }
    );
  }

  Download(fileName: any){
    this.abonne.DownloadFile(fileName).subscribe(
      data => {
        var photo = window.URL.createObjectURL(data);
        this.localUrl.push(photo);
      }
    );
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}

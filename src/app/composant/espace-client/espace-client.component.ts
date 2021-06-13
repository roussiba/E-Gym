import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { routingLink } from 'src/app/shared/routing.service';
import { MatDialog } from '@angular/material';
import { CorpulenceComponent } from '../corpulence/corpulence.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DialogDetail } from '../parametrage/add-abonnee/add-abonnee.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit {

  photo: any;
  id: any;
  idSalle: any;
  clientGym: any;
  imc: string;
  description : string;
  abonnements: any = [];
  newAbonnements: any = [];
  dropdownList:any;
  lesAbonnements: any;
  lesAbonnementSelect = []; 
  dropdownSettings : IDropdownSettings = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
     private toast: ToastrService, private abonneService: AbonnementService,
     public dialog: MatDialog,private sanitizer:DomSanitizer) { 

  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id != null){
      this.GetAbonneById(this.id);
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'libelle',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        showSelectedItemsAtTop: true
  
      };
      
    }else{
      this.router.navigate([routingLink.routeClientAbonnes]);
    }
    
  }

  openDialogAbonnement(items){
    if(items !== null){
      this.lesAbonnements.forEach((abonn:any,index:any )=> {
        if(abonn.id === items.id){
          this.lesAbonnementSelect.push(abonn);
        }
      });
    }
    const dialogRef = this.dialog.open(DialogDetail,{
          data:{ lesAbonnementSelect: this.lesAbonnementSelect }
        }
      );

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deselectAbonnement(items){
    if(items !== null){
      this.lesAbonnements.forEach((abonn:any,index:any )=> {
        if(abonn.id === items.id){
          this.lesAbonnementSelect.splice(abonn,1);
        }
      });
    }
  }

  getAbonnementSalle(){
    console.log("init");
    this.abonneService.GetAbonnementSalle(this.idSalle).subscribe(
      data => {
        console.log("init",data);
        this.dropdownList = data;
        this.lesAbonnements = data;
      }
    );
  }

  GetAbonneById(id: any){
    this.abonneService.GetClientAbonne(id).subscribe(
      data =>{
        let result:any = data;
        this.clientGym = result.body.abonne;
        this.idSalle = this.clientGym.salleId;
        console.log("this.idSalle ",this.idSalle);

        this.abonnements = result.body.abonnements;
        this.imc = result.body.imc;
        this.description = result.body.description;
        this.dropdownList = result.body.abonnementSalles;
        this.lesAbonnements = result.body.abonnementSalles;
        this.Download(this.clientGym.photo);
        console.log(result.body.abonnementSalles);
      },
      error => {
        if(error.status === 404){
          this.toast.warning("Client non trouve");
          this.router.navigate([routingLink.routeClientAbonnes]);
        }else{
          this.toast.warning("Erreur Server");
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

  AddAbonnementClient(){
    console.log("newAbonnements ", this.newAbonnements);
    if(this.newAbonnements.length > 0){
      this.abonneService.AddClientAbonnement(this.newAbonnements, this.id).subscribe(
        data => {
          this.getAbonnementSalle();
          this.GetAbonneById(this.id);
          this.newAbonnements = [];
        }, 
        error => {
          console.log(error);
        }
      );
    }

    
    
  }

  Download(fileName: any){
        this.abonneService.DownloadFile(fileName).subscribe(
          data => {
            this.photo = window.URL.createObjectURL(data);
          }
        );
      }
    
      sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}

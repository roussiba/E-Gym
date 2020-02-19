import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';
import { AbonnementSalleComponent } from '../abonnement-salle/abonnement-salle.component';

@Component({
  selector: 'app-new-abonnement-salle',
  templateUrl: './new-abonnement-salle.component.html',
  styleUrls: ['./new-abonnement-salle.component.css']
})
export class NewAbonnementSalleComponent implements OnInit {

  salleId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private form: FormBuilder,
  private route: Router,
  private service: AbonnementService,
  public toastr: ToastrService,
  public dialogRef: MatDialogRef<NewAbonnementSalleComponent>) { 
    console.log("this.data ---> ", this.data.SalleId);
    this.salleId = parseInt(this.data.SalleId);
    this.data = this.form.group({
      Libelle: ['',Validators.required],
      PrixAbonnement: ['',Validators.required],
      MontantAdhesion: ['',Validators.required],
      Mensualite: ['',Validators.required],
      AutresFrais: ['',Validators.required],
      Promotion: ['',Validators.required],
      SalleId: [this.salleId]
    });
    console.log("this.data next ---> ", this.data);

  }

  ngOnInit() {
    
  }

  onNoClick(){
    this.dialogRef.close();
  }

  AddNouveauAbonnement(){
    console.log(this.data.value);
    if(this.data.valid){
      this.service.NewAbonnementSalle(this.data.value).subscribe(
        data => {
          if(data === 1){
            this.toastr.info("Nouveau abonnement enrégistré");
            this.data.reset();
            this.route.navigateByUrl(routingLink.routeClientAbonnes, { skipLocationChange: true }).then(() => {
              this.route.navigate([routingLink.routeSalleAbonne+ this.salleId]);
            }); 
          }else{
            this.toastr.info("Veuillez recommencer une erreur est survenue","Information")
          }
        },
        error => {
          this.toastr.warning("Veuillez recommencer une erreur est survenue","Information")
        }
      );
    }
  }

  get Libelle(): any{ return this.data.get("Libelle");} 
  get PrixAbonnement(): any{ return this.data.get("PrixAbonnement");} 
  get MontantAdhesion(): any{ return this.data.get("MontantAdhesion");} 
  get Mensualite(): any{ return this.data.get("Mensualite");} 
  get AutresFrais(): any{ return this.data.get("AutresFrais");} 
  get Promotion(): any{ return this.data.get("Promotion");} 
  get SalleId(): any{ return this.data.get("SalleId");} 

}

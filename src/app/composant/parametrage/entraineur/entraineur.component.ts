import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProprietaireService } from 'src/app/shared/proprietaire.service';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-entraineur',
  templateUrl: './entraineur.component.html',
  styleUrls: ['./entraineur.component.css']
})
export class EntraineurComponent implements OnInit {

  
  constructor(private activatedRoute: ActivatedRoute,  
    private form: FormBuilder, 
    private toastr: ToastrService, private service: ProprietaireService, 
    private router: Router) { }
  
  idEntraineur: any;
  idSalle : any;
  EntraineurForm : any;

  ngOnInit() {
    this.idSalle = this.activatedRoute.snapshot.params.id;
    if(this.idSalle == null){
      this.router.navigate([routingLink.routeDashboard]);
    }else{
      this.idEntraineur = this.activatedRoute.snapshot.params.idEntraineur;
      this.getEntraineur(this.idEntraineur);
      console.log('this.idEntraineur ---> ',this.idEntraineur);

      this.EntraineurForm = this.form.group({
        Prenom: ['', Validators.required],
        Nom: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        PasswordConfirm: ['',[Validators.required, Validators.minLength(6)]],
        Telephone: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9)
        ])],
        Sexe: ['', Validators.required],
        Roles:[['Entraineur']],
        TypeCompte: [2],
        SalleGymId: [this.idSalle]
      }, {validator: this.CheckPasswords });
    }
  }

  getEntraineur(id: any){
    this.service.GetEntraineur(id).subscribe(
      data => {
        console.log(data);
        let gerant:any = data;
        this.EntraineurForm.setValue({
          Prenom: gerant.prenom,
          Nom: gerant.nom,
          Password: "",
          PasswordConfirm: "",
          Telephone: gerant.telephone,
          Sexe: gerant.sexe,
          Roles:[['Entraineur']],
          TypeCompte: [2],
          SalleGymId: gerant.salleGymId
        })
      }
    );
  }

  addEntraineur(){
    this.EntraineurForm.get('SalleGymId').setValue(parseInt(this.idSalle));
    console.log(this.EntraineurForm.value);
    if(this.idEntraineur === null || this.idEntraineur == undefined){
      if (!this.EntraineurForm.valid) {
        return false;
      }
      this.service.AddPropriete(this.EntraineurForm.value).subscribe(
        data =>{
          console.log('data --> ', data);
          if(data === 1){
            this.toastr.info("Enregistrement effectué !", "Entraineur");
            this.EntraineurForm.reset();
            this.router.navigate([routingLink.routeEntraineurs, this.idSalle]);
          }else{
            this.toastr.error("Erreur veuillez recommencer !", "Entraineur");
          }
        },
        err => {
          console.error(err);
        });
    }else{
      console.log('data --> ', this.idEntraineur);

      this.service.UpdateGerant(this.EntraineurForm.value, this.idEntraineur).subscribe(
        data =>{
          if(data === 1){
            this.toastr.info("Modification effectué !", "Entraineur");
            this.EntraineurForm.reset();
            this.router.navigate([routingLink.routeGerants, this.idSalle]);
          }else{
            this.toastr.error("Erreur veuillez recommencer !", "Entraineur");
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    }
  }

  CheckPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.controls.Password.value;
  const confirmPass = group.controls.PasswordConfirm.value;

  return pass === confirmPass ? null : { notSame: true };
}

  CheckTelephone(telephone: FormControl){
    console.log('telephone', Number(telephone.value));
    if(Number(telephone.value)){
      if(telephone.valid){
        console.log("Is valide");
        return false;
      }else{
        this.toastr.warning("Completer le numéro de téléphone !");
      }
    }else{
      this.toastr.warning("Numéro Téléphone incorrecte !");
      telephone.setValue("");
    }
  }

  get Prenom(): any { return this.EntraineurForm.get('Prenom'); }
  get Nom(): any { return this.EntraineurForm.get('Nom'); }
  get Telephone(): any { return this.EntraineurForm.get('Telephone'); }
  get Sexe(): any { return this.EntraineurForm.get('Sexe'); }
  get PasswordConfirm(): any { return this.EntraineurForm.get('PasswordConfirm'); }
  get Password(): any { return this.EntraineurForm.get('Password'); }


}

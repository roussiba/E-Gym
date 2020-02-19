import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProprietaireService } from 'src/app/shared/proprietaire.service';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.css']
})
export class ProprietaireComponent implements OnInit {

  constructor(private form: FormBuilder, private toastr: ToastrService, private service: ProprietaireService, private router: Router) { }
  
  proprietaireForm = this.form.group({
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
    Roles:[['Proprietaire']],
    TypeCompte: [1]
  }, {validator: this.CheckPasswords });

  ngOnInit() {
  }

  addProprietaire(){
    console.log(this.proprietaireForm.value);
    if (!this.proprietaireForm.valid) {
      return false;
    }
    this.service.AddPropriete(this.proprietaireForm.value).subscribe(
      data =>{
        console.log('data --> ', data);
        if(data === 1){
          this.toastr.info("Enregistrement effectué !", "Propriétaire");
          this.proprietaireForm.reset();
          this.router.navigate([routingLink.routeLogin]);
        }else{
          this.toastr.error("Erreur veuillez recommencer !", "Propriétaire");
        }
      },
      err => {
        console.error(err);
      })
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

  get Prenom(): any { return this.proprietaireForm.get('Prenom'); }
  get Nom(): any { return this.proprietaireForm.get('Nom'); }
  get Telephone(): any { return this.proprietaireForm.get('Telephone'); }
  get Sexe(): any { return this.proprietaireForm.get('Sexe'); }
  get PasswordConfirm(): any { return this.proprietaireForm.get('PasswordConfirm'); }
  get Password(): any { return this.proprietaireForm.get('Password'); }

}

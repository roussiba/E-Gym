import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProprietaireService } from 'src/app/shared/proprietaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-gerant',
  templateUrl: './gerant.component.html',
  styleUrls: ['./gerant.component.css']
})
export class GerantComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,  
    private form: FormBuilder, 
    private toastr: ToastrService, private service: ProprietaireService, 
    private router: Router) { }
  
  idGerant: any;
  idSalle : any;
  gerantForm : any;

  ngOnInit() {
    this.idSalle = this.activatedRoute.snapshot.params.id;
    if(this.idSalle == null){
      this.router.navigate([routingLink.routeDashboard]);
    }else{
      this.idGerant = this.activatedRoute.snapshot.params.idGerant;
      this.getGerant(this.idGerant);
      console.log('this.idGerant ---> ',this.idGerant);

      this.gerantForm = this.form.group({
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
        Roles:[['Gerant']],
        TypeCompte: [0],
        SalleGymId: [this.idSalle]
      }, {validator: this.CheckPasswords });
    }
  }

  getGerant(id: any){
    this.service.GetGerant(id).subscribe(
      data => {
        console.log(data);
        let gerant:any = data;
        this.gerantForm.setValue({
          Prenom: gerant.prenom,
          Nom: gerant.nom,
          Password: "",
          PasswordConfirm: "",
          Telephone: gerant.telephone,
          Sexe: gerant.sexe,
          Roles:[['Gerant']],
          TypeCompte: [0],
          SalleGymId: gerant.salleGymId
        })
      }
    );
  }

  addGerant(){
    this.gerantForm.get('SalleGymId').setValue(parseInt(this.idSalle));
    console.log(this.gerantForm.value);
    if(this.idGerant === null){
      if (!this.gerantForm.valid) {
        return false;
      }
      this.service.AddPropriete(this.gerantForm.value).subscribe(
        data =>{
          console.log('data --> ', data);
          if(data === 1){
            this.toastr.info("Enregistrement effectué !", "Gérant");
            this.gerantForm.reset();
            this.router.navigate([routingLink.routeGerants, this.idSalle]);
          }else{
            this.toastr.error("Erreur veuillez recommencer !", "Gérant");
          }
        },
        err => {
          console.error(err);
        });
    }else{
      console.log('data --> ', this.idGerant);

      this.service.UpdateGerant(this.gerantForm.value, this.idGerant).subscribe(
        data =>{
          if(data === 1){
            this.toastr.info("Modification effectué !", "Gérant");
            this.gerantForm.reset();
            this.router.navigate([routingLink.routeGerants, this.idSalle]);
          }else{
            this.toastr.error("Erreur veuillez recommencer !", "Gérant");
          }
        },
        err => {
          console.error(err);
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

  get Prenom(): any { return this.gerantForm.get('Prenom'); }
  get Nom(): any { return this.gerantForm.get('Nom'); }
  get Telephone(): any { return this.gerantForm.get('Telephone'); }
  get Sexe(): any { return this.gerantForm.get('Sexe'); }
  get PasswordConfirm(): any { return this.gerantForm.get('PasswordConfirm'); }
  get Password(): any { return this.gerantForm.get('Password'); }


}

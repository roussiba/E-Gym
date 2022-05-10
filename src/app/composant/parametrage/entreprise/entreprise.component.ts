import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {

  dropdownList:any;
  lesAbonnements: any;
  photoFile: any;
  AbonnementSelect: any;
  idSalle: any;
  selectedItems = Array<Personne>();
  dropdownSettings : IDropdownSettings = {};
  mesEmploye: MatTableDataSource<Personne>;
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe','actions'];
  dataSource : any;
  personne: Personne;



  entrepriseForm = this.form.group({
    NomEntreprise: ['', Validators.required],
    Adresse: [''],
    AbonnementId: ['', Validators.required],
    Employes: [[],Validators.required]
  });


  constructor(private form: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private abonnement: AbonnementService,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('this.Employes ',this.mesEmploye);
    this.personne = new Personne();
    this.idSalle = this.activatedRoute.snapshot.params.id;
    this.getAbonnementSalle();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      showSelectedItemsAtTop: true

    };
    this.mesEmploye = new MatTableDataSource();
  }

  addEntreprise(){

  }

  deleteEmploye(){

  }

  openDialogFin(items: any, position: any) {
    console.log('item ',items);
  }

  CheckTelephone(telephone: any){
    if(Number(telephone)){
      console.log("Is valide");
        return false;
    }else{
      this.toastr.warning("Numéro Téléphone incorrecte !");
    }
  }

  onItemSelect(items: any){
    console.log('items ', items);    
  }

  checkPersonData(personne: Personne): Boolean{
    console.log(personne.Nom);
    return personne.Nom !== undefined && personne.Prenom !== undefined && personne.Sexe !== undefined ? true : false;
  }

  addPersonne(){
    console.log('this.checkPersonData(this.personne) ', this.checkPersonData(this.personne));
    if(!this.checkPersonData(this.personne)){
      this.toastr.warning("Veuillez renseigner les données obligatoires (*)");
      return;
    }
    this.personne.index = this.mesEmploye === undefined ? 0 : this.mesEmploye.data.length +1;
    this.mesEmploye.data.push(this.personne);
    this.Employes.setValue(this.mesEmploye);
    this.personne = new Personne();
    this.mesEmploye._updateChangeSubscription();
    console.log('this.Employes ', this.mesEmploye);
  }

  getAbonnementSalle(){
    this.abonnement.GetAbonnementSalle(this.idSalle).subscribe(
      data => {
        this.dropdownList = data;
        this.lesAbonnements = data;
      }
    );
  }

  photoChange(event: any){
    console.log(event);
    if(event !== null){
      let fileGet = event.target.files[0];
      if(fileGet.type.split("/")[0] !== "image"){
        this.toastr.warning("Veuillez Choisir une image !", "Attention",{
          closeButton: true,
          progressBar: true
        });
        this.entrepriseForm.get("Photo").setValue("");
        return false;
      }
      this.photoFile = fileGet;
    }
    console.log(this.photoFile);
  }


  get NomEntreprise(): any { return this.entrepriseForm.get('NomEntreprise'); }
  get Adresse(): any { return this.entrepriseForm.get('Adresse'); }
  get AbonnementId(): any { return this.entrepriseForm.get('AbonnementId'); }
  get Employes(): any { return this.entrepriseForm.get('Employes'); }

}

export class Personne{
  index: number;
  Nom : string;
  Prenom : string;
  Sexe : string;
  Age : number;
  Telephone : string;
  TelephoneUrgent : string;
  Photo : string;

  constructor(){}
}

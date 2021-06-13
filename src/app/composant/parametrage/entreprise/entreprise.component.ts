import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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
  selectedItems = [];
  dropdownSettings : IDropdownSettings = {};
  mesEmploye = [];
  displayedColumns: string[] = ['nom', 'prenom', 'telephone', 'sexe','actions'];
  dataSource : any;

  abonneForm = this.form.group({
    Prenom: ['', Validators.required],
    Nom: ['', Validators.required],
    SalleId: ['', Validators.required],
    Telephone: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(9),
      Validators.minLength(9)
    ])],
    TelephoneUrgence: ['', Validators.required],
    Sexe: ['', Validators.required],
    Age: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(2)
    ])],
    Photo: [''],
    Abonnements: [[], Validators.required]
  });


  constructor(private form: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private abonnement: AbonnementService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
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
  }

  addEntreprise(){

  }

  deleteEmploye(){
    
  }

  openDialogFin(items: any, position: any) {
    console.log('item ',items);
  }

  CheckTelephone(telephone: FormControl){
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

  onItemSelect(items: any){
    console.log('items ', items);
    this.lesAbonnements.forEach((abonn:any,index:any )=> {
      if(abonn.id === items.id){
        console.log(abonn);
        return false;
      }
      console.log(index);
    });
    
    console.log('AbonnementId ', this.Abonnements);
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
        this.abonneForm.get("Photo").setValue("");
        return false;
      }
      this.photoFile = fileGet;
    }
    console.log(this.photoFile);
  }


  get Prenom(): any { return this.abonneForm.get('Prenom'); }
  get Nom(): any { return this.abonneForm.get('Nom'); }
  get Telephone(): any { return this.abonneForm.get('Telephone'); }
  get TelephoneUrgence(): any { return this.abonneForm.get('TelephoneUrgence'); }
  get Sexe(): any { return this.abonneForm.get('Sexe'); }
  get Age(): any { return this.abonneForm.get('Age'); }
  get Abonnements(): any { return this.abonneForm.get('Abonnements'); }

}

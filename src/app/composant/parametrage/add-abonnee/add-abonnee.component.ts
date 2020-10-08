import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { isNumber } from 'util';
import { FileSendService } from 'src/app/shared/file-send.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SallegymService } from 'src/app/shared/sallegym.service';

@Component({
  selector: 'app-add-abonnee',
  templateUrl: './add-abonnee.component.html',
  styleUrls: ['./add-abonnee.component.css']
})
export class AddAbonneeComponent implements OnInit {

  constructor(private form: FormBuilder, private toastr: ToastrService, 
    private abonnement: AbonnementService, private fileForm: FileSendService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private salleService: SallegymService) { }

  mesSalles: any;
  dropdownList:any;
  lesAbonnements: any;
  lesAbonnementSelect = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings = {};
  photoFile: any;
  idSalle: any;
  montantTotal: any = 0;

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

  ngOnInit() {
    this.idSalle = this.activatedRoute.snapshot.params.id;
    this.getAbonnementSalle();
    this.mesSalleGym();
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
  }

  addAbonnement(){
    console.log(this.abonneForm.value);
    if (!this.abonneForm.valid) {
      return false;
    }
    let formData = this.fileForm.FileToFormData(this.photoFile, this.abonneForm.value, "abonne");
    this.abonnement.AddAbonnement(formData).subscribe(
      data =>{
        console.log('data --> ', data);
        if(data > 0){
          this.toastr.info("Abonnement effectué !", "Abonné");
          this.abonneForm.reset();
          this.Abonnements.setValue([]);
        }else{
          this.toastr.error("Erreur veuillez recommencer !", "Abonné");
        }
      },
      err => {
        console.error(err);
      })
    console.log('formData ', formData);
  }

  mesSalleGym(){
    this.salleService.mesSalleGym().subscribe(
      data => {
        this.mesSalles = data;
      }
    );
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

  get Prenom(): any { return this.abonneForm.get('Prenom'); }
  get Nom(): any { return this.abonneForm.get('Nom'); }
  get Telephone(): any { return this.abonneForm.get('Telephone'); }
  get TelephoneUrgence(): any { return this.abonneForm.get('TelephoneUrgence'); }
  get Sexe(): any { return this.abonneForm.get('Sexe'); }
  get Age(): any { return this.abonneForm.get('Age'); }
  get Abonnements(): any { return this.abonneForm.get('Abonnements'); }
  get SalleId(): any { return this.abonneForm.get('SalleId'); }

  ConvertToMoney(money: any) {
    const formatter = new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'CFA',
        minimumFractionDigits: 0
    });
    return formatter.format(parseInt(money));
  }

  totalPaiementAbonnements(){
    return this.lesAbonnementSelect.reduce((total,item) => total += item.montantAdhesion + item.autresFrais ,0);
  }

  openDialogFin(items: any, position: any) {
    if(items !== null){
      if(position === 0){
        this.lesAbonnements.forEach((abonn:any, index:any )=> {
          if(abonn.id === items.id){
            this.lesAbonnementSelect.push(abonn);
          }
        });
      }else{
        let indexSpli:any;
        this.lesAbonnementSelect.forEach((abonn:any, index:any )=> {
            if(abonn.id === items.id){
              indexSpli = index;
              return;
            }
        });
        this.lesAbonnementSelect.splice(indexSpli, 1);

      }
      
    }
    this.montantTotal = this.totalPaiementAbonnements();
    const dialogRef = this.dialog.open(DialogDetail,{
          data:{ lesAbonnementSelect: this.lesAbonnementSelect, montantTotal: this.montantTotal },
          width: '80%'
        }
      );

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'show-detail',
  templateUrl: 'show-detail.html',
})
export class DialogDetail {
  /**
   *
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
}
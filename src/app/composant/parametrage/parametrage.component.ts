import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { slideInAnimation } from '../dashboard/animation';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalleGym } from 'src/app/models/SalleGym';
import { SallegymService } from 'src/app/shared/sallegym.service';
import { ToastrService } from 'ngx-toastr';
import { FileSendService } from 'src/app/shared/file-send.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css'],
  animations: [slideInAnimation]
})
export class ParametrageComponent implements OnInit {

  constructor(private abonneService: AbonnementService, public dialog: MatDialog, private salleService: SallegymService,
    private toast: ToastrService
    ) { }

  abonnes : any;
  salles: any;
  displayedColumns: string[] = ['photo','nom', 'prenom', 'telephone', 'sexe','actions'];
  dataSource : any;
  salle: SalleGym = new SalleGym();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.getMesAbonnes();
    this.getMesSalleGym();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.abonnes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialogSalleGym(): void {
    const dialogRef = this.dialog.open(DialogSalleGym, {
      //width: '500px',
      data: {
        LibelleSalle: this.salle.LibelleSalle,
        Adresse: this.salle.Adresse,
        Telephone: this.salle.Telephone,
        PrixPassager: this.salle.PrixPassager,
        Localisation: this.salle.Localisation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.salle.LibelleSalle = result.LibelleSalle;
      this.salle.Adresse = result.Adresse;
      this.salle.Telephone = result.Telephone;
      this.salle.PrixPassager = result.PrixPassager;
      this.salle.Localisation = result.Localisation;
      
    });
  }

  getMesSalleGym(){
    this.salleService.mesSalleGym().subscribe(
      data => {
        console.log(data);
        this.salles = data;
      },
      erreur => {
        this.toast.error("Veuillez réactualiser la page !");
      }
    );
  }

  getMesAbonnes(){
    this.abonneService.MesAbonne().subscribe(
      data => {
        console.log('abonnes ', data);
        this.abonnes = data;
      },
      error =>{ 
        console.log('Erreur ', error);
      }
    );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'dialog-salle-gym',
  templateUrl: 'DialogSalleGym.html',
})
export class DialogSalleGym {

  constructor(private toastr: ToastrService,private form: FormBuilder,
    private salleGym: SallegymService, private fileForm: FileSendService,
    public dialogRef: MatDialogRef<DialogSalleGym>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data = this.form.group({
        LibelleSalle: ['',Validators.required],
        Adresse: ['',Validators.required],
        Telephone: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9)
        ])],
        Localisation: ['',Validators.required],
        PrixPassager: ['',Validators.required],
        Photo: ['']
      });
    }

    photoSalle: any;
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  photoChange(event: any){
    if(event !== null){
      let fileGet = event.target.files[0];
      if(fileGet.type.split("/")[0] !== "image"){
        this.toastr.warning("Veuillez Choisir une image !", "Attention",{
          closeButton: true,
          progressBar: true
        });
        this.data.get("Photo").setValue("");
        return false;
      }
      this.photoSalle = fileGet;
      console.log(this.photoSalle);
    }
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
  AddSalleGym(){
    console.log(this.data.value);
    console.log(this.photoSalle);
    if(this.data.valid){
      var formData = this.fileForm.FileToFormData(this.photoSalle, this.data.value, "salleGym");
      console.log('formData --> ',formData);
      this.salleGym.addSalleGym(formData).subscribe(
        data => {
          if(data === 1){
            this.toastr.info("Votre salle de gym est enrégistrée")
            this.data.reset();
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

  get LibelleSalle(): any { return this.data.get('LibelleSalle'); }
  get Adresse(): any { return this.data.get('Adresse'); }
  get Telephone(): any { return this.data.get('Telephone'); }
  get Localisation(): any { return this.data.get('Localisation'); }
  get PrixPassager(): any { return this.data.get('PrixPassager'); }
  get Photo(): any { return this.data.get('Photo'); }

}
export interface PeriodicElement {
  nom: string;
  prenom: string;
  telephone: string;
  sexe: string;
}


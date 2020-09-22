import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { AbonnementService } from 'src/app/shared/abonnement.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abonnee',
  templateUrl: './abonnee.component.html',
  styleUrls: ['./abonnee.component.css']
})
export class AbonneeComponent implements OnInit {

  constructor(private abonne : AbonnementService, private toastr: ToastrService,public dialog: MatDialog) { }

  mesAbonnes: any;
  title: any;
  isPresent: boolean;
  textDialog: any;
  textData:any = "MyData";
  @Output() sendData = new EventEmitter<any>();

  ngOnInit() {
    this.getMesAbonnes();
  }
  initData(){
    this.sendData.emit(this.textData);
  }
  openDialog(id: any) {
    this.textDialog = "Le client est-il présent dans la salle ?";
    const dialogRef = this.dialog.open(DialogAlert, {
      data: { textDialog: this.textDialog },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(' id --> ', id);
        this.ClientPresent(id);
      }else{
        console.log(' id --> ', id);
        console.log(`Dialog result annuler`);
      }
    });
  }

  openDialogFin(id: any) {
    this.textDialog = "Le client a-t-il terminé son entrainement ?";
    const dialogRef = this.dialog.open(DialogAlert,{
          data:{ textDialog: this.textDialog }
        }
      );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(' id --> ', id);
        this.UpdateClientPresent(id);
      }else{
        console.log(' id --> ', id);
        console.log(`Dialog result annuler`);
      }
    });
  }

  getMesAbonnes(){
    this.abonne.MesAbonnesPresents().subscribe(
      data => {
        this.title = "Les abonnés";
        this.isPresent = false;
        this.mesAbonnes = data;
        console.log('this mesAbonnes',this.mesAbonnes.length);
        console.log('this mesAbonnes',this.mesAbonnes);
      },
      error => {
        this.toastr.warning("Veuillez réactualiser la page svp !")
      }
    );
  }

  getMesAbonnesPresentsToday(){
    this.abonne.MesAbonnesPresentsToday().subscribe(
      data => {
        this.title = "Les abonnés dans la salle de gym";
        this.isPresent = true;
        this.mesAbonnes = data;
      },
      error => {
        this.toastr.warning("Veuillez réactualiser la page svp !")
      }
    );
  }

  ClientPresent(id: any){
    this.abonne.SetClientPresent(id).subscribe(
      data => {
        this.getMesAbonnes();
      },
      error => {
        this.toastr.warning(error);
      }
    );
  }

  UpdateClientPresent(id: any){
    this.abonne.UpdateClientPresent(id).subscribe(
      data => {
        this.getMesAbonnesPresentsToday();
      },
      error => {
        this.toastr.warning(error);
      }
    );
  }
}

@Component({
  selector: 'dialog-alert',
  templateUrl: 'dialog-alert.html',
})
export class DialogAlert {
  /**
   *
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
}

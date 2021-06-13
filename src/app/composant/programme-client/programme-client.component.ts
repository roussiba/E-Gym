import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TrainingService } from 'src/app/shared/training.service';
import { DialogPaiement } from '../detailpaiement/detailpaiement.component';
import { NewtrainingComponent } from '../newtraining/newtraining.component';

@Component({
  selector: 'app-programme-client',
  templateUrl: './programme-client.component.html',
  styleUrls: ['./programme-client.component.css']
})
export class ProgrammeClientComponent implements OnInit {

  check : any = new FormControl([]);
  membres: any = [];
  participants: any = [];
  participantsAbonnes: any =[];
  programmeId: any;
  distinct: any;
  subtasks: any = [];
  textDialog: any;
  allComplete: boolean = false;
  title: any;
  TotalPaiement :any = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProgrammeClientComponent>,
  private service: TrainingService, private toast: ToastrService,public dialog: MatDialog,public dialogRefAlert: MatDialogRef<DialogPaiement>,) {
    this.programmeId = this.data.ProgrammeId;
    this.distinct = this.data.distinct;
    console.log(this.programmeId);
   }

  ngOnInit() {
    this.getAllAbonnes(this.programmeId, this.distinct);
  }

  onNoClick(){
    this.dialogRef.close();
  }

  ConvertToMoney(money: any) {
    const formatter = new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'CFA',
        minimumFractionDigits: 0
    });
    return formatter.format(parseInt(money));
  }

  getAllAbonnes(ProgrammeId: any, distinct : any){
     this.service.GetAllAbonnesProgrammes(ProgrammeId, distinct).subscribe(
       data => {
         console.log(data);
         if(distinct === 0){
            this.membres = data;
            var that = this;
            this.membres.forEach( element => {
              let task: Task  = {
                client : element,
                participed : false
              };
              that.subtasks.push(task);
            });
         }else{
          this.participants = data.participants;
          this.participantsAbonnes = data.abonnes;
          this.TotalPaiement = this.participants.reduce((total,item) => total += item.montantAdhesion,0);
         }
       }
     );
  }

  ValiderParticipant(){
    var list = this.subtasks.filter(t => t.participed);
    if(list.length > 0){
      var listClient : any = [];
      list.forEach(element => {
        let request : RequestClient = {
          ClientId :element.client.id,
          ProgrammeId : this.programmeId
        };
        listClient.push(request);
      });

      this.service.AddParticipantsProgramme(listClient).subscribe(
        data => {
          this.toast.success("Le membre est ajouté au programme.");
          this.dialogRef.close();
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.toast.warning("Aucun participant selectionné !")
    }
  }

  updateAllComplete() {
    this.allComplete = this.subtasks != null && this.subtasks.every(t => t.participed);
  }

  someComplete(): boolean {
    if (this.subtasks == null) {
      return false;
    }
    return this.subtasks.filter(t => t.participed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.subtasks == null) {
      return;
    }
    this.subtasks.forEach(t => t.participed = completed);
  }

  paiementProgramme(clientId: any, montant: any){
    this.service.PayeParticipantProgrammes(clientId, this.programmeId, montant).subscribe(
      data => {
        if(data ===  1){
          this.getAllAbonnes(this.programmeId, this.distinct);
          console.log(data);
          this.toast.success("Le paiement du programme est enregistré !")
          //this.dialogRef.close();
        }else{
          this.toast.warning("Erreur ! Recommencer");    
        }
      }
    );
  }

  presentProgramme(clientId: any){
    this.service.PresentParticipantProgrammes(clientId, this.programmeId).subscribe(
      data => {
        if(data ===  1){
          this.getAllAbonnes(this.programmeId, this.distinct);
          console.log(data);
          this.toast.success("La Présence du membre est confirmée !")
          //this.dialogRef.close();
        }else{
          this.toast.warning("Erreur ! Recommencer");    
        }
      }
    );
  }

  annulerParticipanr(clientId: any){
    console.log("clientId --- > ", clientId);
    console.log("programmeId --- > ", this.programmeId);
    this.service.AnnulerParticipantProgramme(clientId, this.programmeId).subscribe(
      data => {
        if(data ===  1){
          this.getAllAbonnes(this.programmeId, this.distinct);
          console.log(data);
          this.toast.success("Annulation effectuée !")
         // this.dialogRef.close();
        }else{
          this.toast.warning("Erreur d'annulation !");    
        }
      }
    );
    /*this.textDialog = "Voulez-vous Annuler la participation du client ?";
    this.title = "Programme training";
    const dialogRef = this.dialog.open(DialogPaiement, {
      data: { textDialog: this.textDialog, title: this.title },
    });
    this.dialogRefAlert.afterClosed().subscribe(result => {
      if(result){
        console.log(' id --> ', result);
      }else{
        console.log(' id --> ', result);
        console.log(`Dialog result annuler`);
      }
    });*/
  }

}

export interface Task {
  client: any;
  participed: boolean;
}

export interface RequestClient {
  ClientId: any;
  ProgrammeId: any;
}

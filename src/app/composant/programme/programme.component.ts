import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TrainingService } from 'src/app/shared/training.service';
import { NewtrainingComponent } from '../newtraining/newtraining.component';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {

  idTraining: any;
  mesEntraineurs: any = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewtrainingComponent>,
  private form: FormBuilder , private toastr: ToastrService, private service: TrainingService) {
    this.idTraining = parseInt(this.data.TrainingId);
    console.log("idTraining --> ",this.idTraining);

    this.data = this.form.group({
      DateTrainingDebut: ['',Validators.required],
      DateTrainingFin: ['',Validators.required],
      HeureDebut: ['',Validators.required],
      HeureFin: ['',Validators.required],
      EntraineurId: [0,Validators.required],
      TrainingId: [this.idTraining]
    });
   }

  ngOnInit() {
    this.getEntraineurs();
  }

  AddProgramme(){
    console.log(this.data.value);
    if(this.data.valid){
      this.service.AddProgrammeTraining(this.data.value).subscribe(
        data => {
          this.toastr.success("Votre programme d'entrainement est planifié.");
        }, 
        error =>{
          this.toastr.error("Erreur! Veuillez recommencer la planification.");
        }
      );
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  getEntraineurs(){
    this.service.GetEntraineurBySalle().subscribe(
      data => {
        console.log(data);
        this.mesEntraineurs = data;
      }
    );
  }

}

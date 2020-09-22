import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileSendService } from 'src/app/shared/file-send.service';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-newtraining',
  templateUrl: './newtraining.component.html',
  styleUrls: ['./newtraining.component.css']
})
export class NewtrainingComponent implements OnInit {

  photoSalle: any;
  typesOfShoes: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi','Dimanche'];
  repetition: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewtrainingComponent>,
  private form: FormBuilder , private toastr: ToastrService,private fileForm: FileSendService, private serviceTraining: TrainingService) { }

  ngOnInit() {
    this.data = this.form.group({
      NomTraining: ['',Validators.required],
      Note: [''],
      MontantAdhesion: ['',Validators.required],
      Repetition: [''],
      Repetition1: ['',Validators.required],
      NombreParticipant: ['',Validators.required],
      Photo: [''],
    });
  }

  AddTraining(){
    if(this.data.valid){
      const strin = this.Repetition1.value.join(",");
      this.Repetition.setValue(strin);
      var formData = this.fileForm.FileToFormData(this.photoSalle, this.data.value, "training");
      console.log('formData Training --> ',formData);
      this.serviceTraining.AddNewTraining(formData).subscribe(
        data => {
          this.toastr.success("Le Nouveau Training est enregistré.")
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  CheckNomTraining(){
    console.log( this.NomTraining.value);
    if(this.NomTraining.value !== ""){
      console.log('ok');
      this.serviceTraining.GetNomTraining(this.NomTraining.value).subscribe(
        data => {
          if(data === false){
            this.toastr.warning("Le nom du training existe déjà ! Veuillez changer de nom");
            this.NomTraining.setValue("");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    console.log("non");
  }

  onNoClick(){
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

  public get NomTraining() : any { return this.data.get("NomTraining"); }
  public get Note() : any { return this.data.get("Note"); }
  public get MontantAdhesion() : any { return this.data.get("MontantAdhesion"); }
  public get Repetition() : any { return this.data.get("Repetition"); }
  public get Repetition1() : any { return this.data.get("Repetition1"); }
  public get NombreParticipant() : any { return this.data.get("NombreParticipant"); }
  public get Photo() : any { return this.data.get("Photo"); }

}

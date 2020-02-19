import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-corpulence',
  templateUrl: './corpulence.component.html',
  styleUrls: ['./corpulence.component.css']
})
export class CorpulenceComponent implements OnInit {

  clientId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private form: FormBuilder, 
  private client: ClientService,
  private toast: ToastrService,
  public dialogRef: MatDialogRef<CorpulenceComponent>) { 
    this.clientId = parseInt(this.data.ClientId);
    this.data = this.form.group({
      Poids: ['',Validators.required],
      Epaule: ['',Validators.required],
      Taille: ['',Validators.required],
      Cuisse: ['',Validators.required],
      Hanche: ['',Validators.required],
      ClientId: [this.clientId]
    });
  }

  ngOnInit() {
  }

  AddCorpulence(){
    console.log("Add Corpulence", this.data.value);
    if(this.data.valid){
      this.client.addCorpulence(this.data.value).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.toast.warning("Veuillez renseigner tous les elements.");
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
  
  public get Poids() : any { return this.data.get("Poids"); }
  public get Epaule() : any { return this.data.get("Epaule"); }
  public get Taille() : any { return this.data.get("Taille"); }
  public get Cuisse() : any { return this.data.get("Cuisse"); }
  public get Hanche() : any { return this.data.get("Hanche"); }
  public get ClientId() : any { return this.data.get("ClientId"); }
  
}

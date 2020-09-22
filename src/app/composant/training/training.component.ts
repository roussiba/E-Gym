import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewtrainingComponent } from '../newtraining/newtraining.component';
import { TrainingService } from 'src/app/shared/training.service';
import {DomSanitizer} from '@angular/platform-browser';
import { ProgrammeComponent } from '../programme/programme.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  training: any;
  FileDow : any
  localUrl: any = [];
  constructor(public dialog: MatDialog, private servicetraining: TrainingService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.localUrl = [];
    this.GetTrainingBySalle();
    console.log(this.localUrl);
  }

  GetTrainingBySalle(){
    this.servicetraining.GetTrainingBySalle().subscribe(
      data => {
        console.log(data);
        this.training = data;
        this.training.forEach(element => {
          this.Download(element.photo);
        });
      }
    );
  }

  openNewTraining(){
    const dialoRef = this.dialog.open(NewtrainingComponent, {
      data: {ClientId : 0}
    });

    dialoRef.afterClosed().subscribe(data => {
      console.log(`Dialog annuler`);
    });
  }


  ProgrammerTraining(id: any){
    const dialoRef = this.dialog.open(ProgrammeComponent, {
      data: {TrainingId : id}
    });

    dialoRef.afterClosed().subscribe(data => {
      console.log(`Dialog annuler`);
    });
  }

  ModifierTraining(id){

  }

  SupprimerTraining(id){

  }

  Download(fileName: any){
    this.servicetraining.DownloadFile(fileName).subscribe(
      data => {
        this.localUrl.push(window.URL.createObjectURL(data));
      }
    );
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}

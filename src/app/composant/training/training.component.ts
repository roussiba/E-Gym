import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewtrainingComponent } from '../newtraining/newtraining.component';
import { TrainingService } from 'src/app/shared/training.service';
import {DomSanitizer} from '@angular/platform-browser';
import { ProgrammeComponent } from '../programme/programme.component';
import { routingLink } from 'src/app/shared/routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  searchPrenom: any;
  training: any;
  FileDow : any
  localUrl: any = [];
  tempMesTraining: [];
  constructor(public dialog: MatDialog, private servicetraining: TrainingService,private sanitizer:DomSanitizer,
      private route: Router) { }

  ngOnInit() {
    this.localUrl = [];
    this.GetTrainingBySalle();
  }

  GetTrainingBySalle(){
    this.servicetraining.GetTrainingBySalle().subscribe(
      data => {
        console.log(data);
        this.training = data;
        console.log(this.training);
        this.training.forEach(element => {
          this.Download(element.photo);
        });
        this.tempMesTraining = this.training;
      }
    );
  }

  Search(){
    this.training = this.tempMesTraining;
    if(this.searchPrenom !== ""){
      this.training = this.training.filter(s => s.nomTraining.toLowerCase().includes(this.searchPrenom.toLowerCase()));
    }
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
        let photo= new Photo();
        photo.key = fileName, photo.value = window.URL.createObjectURL(data)
        this.localUrl.push(photo);

      }
    );
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


}

export class Photo{
  key:any; value: any;
  constructor(){}
}
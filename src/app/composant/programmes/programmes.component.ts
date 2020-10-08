import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TrainingService } from 'src/app/shared/training.service';
import { ProgrammeClientComponent } from '../programme-client/programme-client.component';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {

  programmes:any = [];
  localUrl: any = [];
  constructor(private sanitizer:DomSanitizer, private service: TrainingService,public dialog: MatDialog) { }

  ngOnInit() {
    this.localUrl = [];
    this.getAllProgrammes();
  }

  getAllProgrammes(){
    this.service.GetAllProgrammes().subscribe(
      data => {
        this.programmes = data;
        this.programmes.forEach(element => {
          console.log("element ", element);
          this.Download(element.training.photo);
        });
      }, 
      error => {
        this.programmes = [];
      }
    );
  }

  Download(fileName: any){
    this.service.DownloadFile(fileName).subscribe(
      data => {
        var photo = window.URL.createObjectURL(data);
        this.localUrl.push(photo);
      }
    );
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

NouveauParticipant(id: any){
  const dialoRef = this.dialog.open(ProgrammeClientComponent, {
    data: {ProgrammeId : id, distinct : 0},
    width: '80%'
  });

  dialoRef.afterClosed().subscribe(data => {
    console.log(`Dialog annuler`);
  });
}

LesParticipants(id: any){
  const dialoRef = this.dialog.open(ProgrammeClientComponent, {
    data: {ProgrammeId : id, distinct : 1},
    width: '80%'
  });

  dialoRef.afterClosed().subscribe(data => {
    console.log(`Dialog annuler`);
  });
}
ConvertToMoney(money: any) {
  const formatter = new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'CFA',
      minimumFractionDigits: 0
  });
  return formatter.format(parseInt(money));
}

}

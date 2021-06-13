import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: any;
  constructor(private sanitizer:DomSanitizer, private service: TrainingService,public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private router: Router) { }
    
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id !== null){
      this.localUrl = [];
      this.getAllProgrammes(this.id);
    }
    
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
 
  getAllProgrammes(id: any){
    this.service.GetAllProgrammes(id).subscribe(
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
    maxWidth: '100%',
    maxHeight: '100',
    width: '90%',
    height: '95%'
  });

  dialoRef.afterClosed().subscribe(data => {
    console.log(`Dialog annuler`);
  });
}

LesParticipants(id: any){
  const dialoRef = this.dialog.open(ProgrammeClientComponent, {
    data: {ProgrammeId : id, distinct : 1},
    maxWidth: '100%',
    maxHeight: '100',
    width: '90%',
    height: '95%'
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

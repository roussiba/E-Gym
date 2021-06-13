import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-abonnement-valide',
  templateUrl: './abonnement-valide.component.html',
  styleUrls: ['./abonnement-valide.component.css']
})
export class AbonnementValideComponent implements OnInit {

  abonnement: any;
  constructor(private service: TrainingService) { }

  ngOnInit() {
    this.getAbonnementValid();
  }

  ConvertToMoney(money: any) {
    const formatter = new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'CFA',
        minimumFractionDigits: 0
    });
    return formatter.format(parseInt(money));
  }

  getAbonnementValid(){
    this.service.GetAllAbonnement().subscribe(
      data => {
        console.log(data);
        this.abonnement = data;
      },
      erreur => {
        this.abonnement = [];
      }
    );
  }

}

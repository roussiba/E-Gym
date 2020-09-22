import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from 'src/app/shared/paiement.service';
import { isUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { routingLink } from 'src/app/shared/routing.service';

@Component({
  selector: 'app-detailpaiement',
  templateUrl: './detailpaiement.component.html',
  styleUrls: ['./detailpaiement.component.css']
})
export class DetailpaiementComponent implements OnInit {

  TPaiement: number = 0;
  TotalPaiement: number = 0;
  abonnementRes: number = 0;
  TPaiementAbonnements: number = 0;
  idClient: any;
  textDialog: any;
  Client: any = null;
  paiementAbo: any = [];
  paiementAbonnements: any = [];
  paiementAdd: any = [];
  validePaiement: boolean = false;
  date: any;

  constructor(private activatedRoute: ActivatedRoute, private paiement: PaiementService, 
    private toastr: ToastrService,private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.params.id;
    this.date = this.activatedRoute.snapshot.params.date;
    console.log('idClient', id);
    if(id !== "" && this.date !== ""){
      this.idClient = id;
      this.getDetailAbonner();
    }
  }

  getDetailAbonner(){
    this.paiement.getClientPaiement(this.idClient, this.date).subscribe(
      data => {
        var response:any = data;
        this.Client = response.body.client;
        this.paiementAbo = response.body.paiementAbo;
        this.paiementAbonnements = response.body.paiementAbonnements;
        console.log('this.paiementAbonnements ', this.paiementAbo);
        console.log('response ', data);
        this.TPaiement = this.totalPaiement();
        this.TPaiementAbonnements = this.totalPaiementAbonnements();
        this.abonnementRes = this.Client.abonnements.length - this.paiementAbonnements.length;
      });
  }

  totalPaiement(){
    return this.Client.abonnements.reduce((total,item) => total += item.abonnement.mensualite,0);
  }

  totalPaiementAbonnements(){
    return this.paiementAbonnements.reduce((total,item) => total += item.montantAbonnement,0);
  }

  totalRestant(){
    return this.TPaiement - this.TPaiementAbonnements;
  }

  paiementAbonnement(id: number){
    if (this.paiementAdd.indexOf(id) === -1) {
      this.paiementAdd.push(id);
      this.TotalPaiement += this.paiementAbo.find(x => x.id === id).abonnement.mensualite;
    }else{
      this.TotalPaiement -= this.paiementAbo.find(x => x.id === id).abonnement.mensualite;
      this.removeItemOnce(this.paiementAdd, id);
  }
}

  removeItemOnce(arr: any, value: any) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  createPaiementAbonnement(){
    return {
      ClientId: parseInt(this.idClient),
      Abonnements: this.paiementAdd
    }
  }

  CheckModePaiement(mode: any){
    //this.validePaiement = true;
    var paiementAbonn = this.createPaiementAbonnement();
    console.log(paiementAbonn);
    this.paiement.PaiementAbonnement(paiementAbonn).subscribe(
      data => {
        if(data > 0){
          this.toastr.success("Paiement effectué");
          this.router.navigate([routingLink.routeSPaiements]);
        }
      },
      err => {
          this.toastr.warning("Erreur de Paiement");
          this.router.navigate([routingLink.routeSPaiements]);
      }
    );
  }
  ConvertToMoney(money: any) {
    const formatter = new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'CFA',
        minimumFractionDigits: 0
    });
    return formatter.format(parseInt(money));
  }

  openDialog(id: any) {
    this.textDialog = "Voulez-vous Valider le paiement du client ?";
    const dialogRef = this.dialog.open(DialogPaiement, {
      data: { textDialog: this.textDialog },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(' id --> ', id);
        this.CheckModePaiement(id);
      }else{
        console.log(' id --> ', id);
        console.log(`Dialog result annuler`);
      }
    });
  }
}


@Component({
  selector: 'dialog-paiement',
  templateUrl: 'dialog.html',
})
export class DialogPaiement {
  /**
   *
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
}
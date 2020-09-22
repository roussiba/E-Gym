import { Injectable } from '@angular/core';
import { ApiHttpService } from './api.http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private api: ApiHttpService) { }
 
   getClientPaiement(id: any, date: any){
    return this.api.get(environment.baseUrlPaiement + "ClientPaiement/" +id +"/"+ date, {observe: 'response'});
  }

  getAllPaiementSalle(){
    return this.api.get(environment.baseUrlPaiement + "AllPaiement");
  }

  PaiementAbonnement(paiementDTO: any){
    return this.api.post(environment.baseUrlPaiement + "PaiementAbonnement",paiementDTO);
  }

  RechercheAbonnement(paiementDTO: any){
    return this.api.post(environment.baseUrlPaiement + "RechercheAbonnement",paiementDTO);
  }
}

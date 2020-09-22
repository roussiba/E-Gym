import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/shared/paiement.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment, Moment} from 'moment';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PaiementsComponent implements OnInit {

  clientGym: any;
  data: any;
  datePaiement: any;
  constructor(private paiementService: PaiementService,private form: FormBuilder) { }
  
  ngOnInit() {
    this.datePaiement = moment().format('DD-MM-YYYY');
    console.log(this.datePaiement);
    this.data = this.form.group({
        Date: [moment() ,Validators.required],
        Telephone: [''],
        Prenom: ['']
      });
    this.getAllPaiementSalle();
  }

  getAllPaiementSalle(){
    this.paiementService.getAllPaiementSalle().subscribe(
      data => {
        console.log("Paiements :: ",data);
        this.clientGym = data;
      });
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.Date.value;
    this.datePaiement = this.Date.value.format('MM-DD-YYYY');
    ctrlValue.month(normalizedMonth.month());
    this.Date.setValue(ctrlValue);
    datepicker.close();
  }

  RechercheAbonnement(){
    console.log(this.data.value);
    console.log(this.Telephone);
    this.paiementService.RechercheAbonnement(this.data.value).subscribe(
      data => {
        console.log("Paiements :: ",data);
        this.clientGym = data;
      });
  }

  public get Date() : any { return this.data.get("Date"); }
  public get Telephone() : any { return this.data.get("Telephone"); }
  public get Prenom() : any { return this.data.get("Prenom"); }
}

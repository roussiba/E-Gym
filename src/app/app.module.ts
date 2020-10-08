import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './shared/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { LoginComponent } from './users/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './composant/header/header.component';
import { FooterComponent } from './composant/footer/footer.component';
import { NavbarComponent } from './composant/navbar/navbar.component';
import { SidebarComponent } from './composant/sidebar/sidebar.component';
import { DashboardComponent } from './composant/dashboard/dashboard.component';
import { AbonneeComponent, DialogAlert } from './composant/abonnee/abonnee.component';
import { ParametrageComponent, DialogSalleGym } from './composant/parametrage/parametrage.component';
import { AddAbonneeComponent, DialogDetail } from './composant/parametrage/add-abonnee/add-abonnee.component';
import { EspaceClientComponent } from './composant/espace-client/espace-client.component';
import { ProprietaireComponent } from './composant/parametrage/proprietaire/proprietaire.component';
import { ApiHttpService } from './shared/api.http.service';
import { ClientGymComponent } from './composant/parametrage/client-gym/client-gym.component';
import { GerantComponent } from './composant/parametrage/gerant/gerant.component';
import { GerantsComponent } from './composant/parametrage/gerants/gerants.component';
import { AbonnementSalleComponent } from './composant/parametrage/abonnement-salle/abonnement-salle.component';
import { NewAbonnementSalleComponent } from './composant/parametrage/new-abonnement-salle/new-abonnement-salle.component';
import { CorpulenceComponent } from './composant/corpulence/corpulence.component';
import { ReportCorpulenceComponent } from './composant/report-corpulence/report-corpulence.component';
import { PaiementsComponent } from './composant/paiements/paiements.component';
import { DetailpaiementComponent, DialogPaiement } from './composant/detailpaiement/detailpaiement.component';
import { TrainingComponent } from './composant/training/training.component';
import { NewtrainingComponent } from './composant/newtraining/newtraining.component';
import { ProgrammeComponent } from './composant/programme/programme.component';
import { EntraineurComponent } from './composant/parametrage/entraineur/entraineur.component';
import { EntraineursComponent } from './composant/parametrage/entraineurs/entraineurs.component';
import { ProgrammesComponent } from './composant/programmes/programmes.component';
import { ProgrammeClientComponent } from './composant/programme-client/programme-client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    DashboardComponent, 
    HeaderComponent, 
    FooterComponent, 
    NavbarComponent, 
    SidebarComponent, 
    AbonneeComponent, 
    ParametrageComponent, 
    AddAbonneeComponent, 
    EspaceClientComponent,
    DialogAlert,
    DialogSalleGym,
    DialogPaiement,
    DialogDetail,
    ProprietaireComponent,
    ClientGymComponent,
    GerantComponent,
    GerantsComponent,
    AbonnementSalleComponent,
    NewAbonnementSalleComponent,
    CorpulenceComponent,
    ReportCorpulenceComponent,
    PaiementsComponent,
    DetailpaiementComponent,
    TrainingComponent,
    NewtrainingComponent,
    ProgrammeComponent,
    EntraineurComponent,
    EntraineursComponent,
    ProgrammesComponent,
    ProgrammeClientComponent
  ],
  exports:[
    MaterialDesignModule
  ],
  entryComponents: [
    DialogAlert, 
    DialogSalleGym,
    DialogPaiement,
    NewAbonnementSalleComponent,
    DialogDetail,
    CorpulenceComponent,
    NewtrainingComponent,
    ProgrammeComponent,
    ProgrammeClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    MaterialDesignModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatFileUploadModule,
    NgMultiSelectDropDownModule.forRoot(),
    HighchartsChartModule
  ],
  providers: [LoginService, LoadingBarService, ApiHttpService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

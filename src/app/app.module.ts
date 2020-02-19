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
    DialogDetail,
    ProprietaireComponent,
    ClientGymComponent,
    GerantComponent,
    GerantsComponent,
    AbonnementSalleComponent,
    NewAbonnementSalleComponent,
    CorpulenceComponent,
    ReportCorpulenceComponent
  ],
  exports:[
    MaterialDesignModule
  ],
  entryComponents: [
    DialogAlert, 
    DialogSalleGym,
    NewAbonnementSalleComponent,
    DialogDetail,
    CorpulenceComponent
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

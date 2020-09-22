import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoginComponent } from './users/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './composant/dashboard/dashboard.component';
import { AbonneeComponent } from './composant/abonnee/abonnee.component';
import { ParametrageComponent } from './composant/parametrage/parametrage.component';
import { AddAbonneeComponent } from './composant/parametrage/add-abonnee/add-abonnee.component';
import { EspaceClientComponent } from './composant/espace-client/espace-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProprietaireComponent } from './composant/parametrage/proprietaire/proprietaire.component';
import { ClientGymComponent } from './composant/parametrage/client-gym/client-gym.component';
import { GerantComponent } from './composant/parametrage/gerant/gerant.component';
import { GerantsComponent } from './composant/parametrage/gerants/gerants.component';
import { AbonnementSalleComponent } from './composant/parametrage/abonnement-salle/abonnement-salle.component';
import { PaiementService } from './shared/paiement.service';
import { PaiementsComponent } from './composant/paiements/paiements.component';
import { DetailpaiementComponent } from './composant/detailpaiement/detailpaiement.component';
import { TrainingComponent } from './composant/training/training.component';
import { EntraineurComponent } from './composant/parametrage/entraineur/entraineur.component';
import { EntraineursComponent } from './composant/parametrage/entraineurs/entraineurs.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'Gym/Proprietaire', component: ProprietaireComponent, data:{ animation: 'dashboard' } },
  { path: 'Gym/Dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Proprietaire', 'Gerant']},
    children: [
      { path: '', component: AbonneeComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Abonnee', component: AbonneeComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Paiements', component: PaiementsComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Training', component: TrainingComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'DetailPaiements/:id/:date', component: DetailpaiementComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'ClientAbonnes/:id', component: ClientGymComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Paramettrage', component: ParametrageComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'NouveauAbonne/:id', component: AddAbonneeComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'EspaceClient/:id', component: EspaceClientComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Gerants/:id', component: GerantsComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Gerant/:id', component: GerantComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Entraineurs/:id', component: EntraineursComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Entraineur/:id', component: EntraineurComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'AbonnementSalle/:id', component: AbonnementSalleComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Gerant/Update/:id&:idGerant', component: GerantComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }},
      { path: 'Entraineur/Update/:id&:idEntraineur', component: EntraineurComponent,canActivate: [AuthGuard], data:{ animation: 'dashboard' }}
    ]
  },
  { path: '**' , redirectTo: 'Gym/Dashboard/Abonnee' , pathMatch: 'full' ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserAnimationsModule,LoadingBarRouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  { path: 'user/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'Gym/Proprietaire', component: ProprietaireComponent, data:{ animation: 'dashboard' } },
  { path: 'Gym/Dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin', 'Proprietaire', 'Gerant']},
    children: [
      { path: '', component: AbonneeComponent, data:{ animation: 'dashboard' }},
      { path: 'Abonnee', component: AbonneeComponent, data:{ animation: 'dashboard' }},
      { path: 'ClientAbonnes/:id', component: ClientGymComponent, data:{ animation: 'dashboard' }},
      { path: 'Paramettrage', component: ParametrageComponent, data:{ animation: 'dashboard' }},
      { path: 'NouveauAbonne/:id', component: AddAbonneeComponent, data:{ animation: 'dashboard' }},
      { path: 'EspaceClient/:id', component: EspaceClientComponent, data:{ animation: 'dashboard' }},
      { path: 'Gerants/:id', component: GerantsComponent, data:{ animation: 'dashboard' }},
      { path: 'Gerant/:id', component: GerantComponent, data:{ animation: 'dashboard' }},
      { path: 'AbonnementSalle/:id', component: AbonnementSalleComponent, data:{ animation: 'dashboard' }},
      { path: 'Gerant/Update/:id&:idGerant', component: GerantComponent, data:{ animation: 'dashboard' }}
    ]
  },
  { path: '**' , redirectTo: 'Gym/Dashboard/Abonnee' , pathMatch: 'full' ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserAnimationsModule,LoadingBarRouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

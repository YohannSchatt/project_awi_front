import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConnexionPageComponent } from '../pages/gestion/connexion-page/connexion-page.component';
import { HomeGestionPageComponent } from '../pages/gestion/home-gestion-page/home-gestion-page.component';
import { PageNotFoundComponent } from '../pages/public/page-not-found/page-not-found.component';
import { HomePageComponent } from '../pages/public/home-page/home-page.component';
import { MonComptePageComponent } from '../pages/mon-compte-page/mon-compte-page.component';
import { GestionGestionnairePageComponent } from '../pages/gestion-gestionnaire-page/gestion-gestionnaire-page.component';
import { SessionPageComponent } from '../pages/session-page/session-page.component';
import { GestionSessionComponent } from '../pages/gestion-session/gestion-session.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'gestion', component: ConnexionPageComponent},
    { path: "gestion/home-gestion", component: HomeGestionPageComponent},
    { path: "gestion/MonCompte", component: MonComptePageComponent},
    { path: "gestion/GestionGestionnaire", component: GestionGestionnairePageComponent},
    { path: "session", component: SessionPageComponent},
    { path: "gestion/GestionSession", component: GestionSessionComponent},
    { path: '**', component: PageNotFoundComponent},
  ];

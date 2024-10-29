import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from '../pages/public/home-page/home-page.component';
import { ConnexionPageComponent } from '../pages/gestion/connexion-page/connexion-page.component';
import { HomeGestionPageComponent } from '../pages/gestion/home-gestion-page/home-gestion-page.component';
import { PageNotFoundComponent } from '../pages/public/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'gestion', component: ConnexionPageComponent},
    { path: "gestion/home-gestion", component: HomeGestionPageComponent},
    { path: '**', component: PageNotFoundComponent},
  ];

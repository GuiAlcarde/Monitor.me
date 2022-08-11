import { DashboardComponent } from './sistema/views/main/dashboard/dashboard.component';
import { SiteMainComponent } from './institucional/site-main/site-main.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaComponent } from './sistema/sistema.component';
import { InstitucionalComponent } from './institucional/institucional.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
    //Rotas do Institucional e Login
    {
        path: "",
        component: InstitucionalComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: "home",
                component: SiteMainComponent,
            }
        ]
    },
    // Rotas do Sistema abaixo
    {
        path: "sistema",
        canActivate: [AuthGuardService],
        component: SistemaComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: "dashboard",
                component: DashboardComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
import { SiteMainComponent } from './site-main/site-main.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitucionalComponent } from './institucional.component';
import { LoginComponent } from './login/login.component';

const instiRoutes: Routes = [
    //Rotas do Institucional e Login

    // Rotas do Sistema abaixo
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
                path: "home/login",
                component: LoginComponent,
            },
            {
                path: "home/cadastro",
                component: CadastroComponent
            },
        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(instiRoutes)],
    exports: [RouterModule],
})
export class InstiRoutingModule { }
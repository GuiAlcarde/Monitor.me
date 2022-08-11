import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HardwareComponent } from './views/main/hardware/hardware.component';
import { DashboardComponent } from './views/main/dashboard/dashboard.component';
import { HardwareCreateComponent } from './views/components/hardware/hardware-create/hardware-create.component';
import { PerfilComponent } from './views/main/perfil/perfil.component';
import { HardwareUpdateComponent } from './views/components/hardware/hardware-update/hardware-update.component';
import { DashComponent } from './views/components/dash/dash.component';
import { SistemaComponent } from './sistema.component';

const sistemaRoutes: Routes = [
    //Rotas do Institucional e Login
    
    // Rotas do Sistema abaixo
    {
        path: "sistema",
        component: SistemaComponent,
        children: [
            {
                path: 'sistema',
                pathMatch: 'prefix',
                redirectTo: 'dashboard'
            },
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "dashboard/dashs",
                component: DashComponent
            },
            {
                path: "hardware",
                component: HardwareComponent
            },
            {
                path: "perfil",
                component: PerfilComponent
            },
            {
                path: "hardware/hardware-create",
                component: HardwareCreateComponent
            },
            {
                path: "hardware/hardware-update/:id",
                component: HardwareUpdateComponent
            }
        ]
    },
    

];

@NgModule({
    imports: [RouterModule.forChild(sistemaRoutes)],
    exports: [RouterModule],
})
export class SistemaRoutingModule { }
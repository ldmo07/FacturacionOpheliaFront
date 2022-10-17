import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';

import { MainPagesComponent } from '../main-pages.component';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';

const routes: Routes = [{
  path:'',
  component : MainPagesComponent,
  children:[
    {path:'guardar',component:GuardarEditarComponent},
    {path:'editar/:id',component:GuardarEditarComponent},
    {path:'tabla-clientes',component:TablaClientesComponent},
    {path:'**',redirectTo:'tabla-clientes'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }

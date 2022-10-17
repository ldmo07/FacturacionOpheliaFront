import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';
import { MainPagesComponent } from '../main-pages.component';

const routes: Routes = [{
  path:'',
  component : MainPagesComponent,
  children:[
    {path:'guardar',component:GuardarEditarComponent},
    {path:'editar/:id',component:GuardarEditarComponent},
    {path:'tabla-productos',component:TablaProductosComponent},
    {path:'**',redirectTo:'tabla-productos'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }

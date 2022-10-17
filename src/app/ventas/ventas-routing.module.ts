import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagesComponent } from '../main-pages.component';
import { VentasPorYearComponent } from './ventas-por-year/ventas-por-year.component';
import { VentasClienteEdadYearComponent } from './ventas-cliente-edad-year/ventas-cliente-edad-year.component';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';

const routes: Routes = [{
  path:'',
  component : MainPagesComponent,
  children:[
    {path:'ventas-year',component:VentasPorYearComponent},
    {path:'ventas-cliente-edad-year',component:VentasClienteEdadYearComponent},
    {path:'registrar-venta/:idCliente',component:RegistrarVentaComponent},
    /*{path:'editar/:id',component:GuardarEditarComponent},*/
    {path:'**',redirectTo:'ventas-year'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

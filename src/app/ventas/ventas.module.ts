import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasPorYearComponent } from './ventas-por-year/ventas-por-year.component';
import { VentasClienteEdadYearComponent } from './ventas-cliente-edad-year/ventas-cliente-edad-year.component';
import { RegistrarVentaComponent } from './registrar-venta/registrar-venta.component';
import { DevExpressModule } from '../dev-express/dev-express.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentasPorYearComponent,
    VentasClienteEdadYearComponent,
    RegistrarVentaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    DevExpressModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class VentasModule { }

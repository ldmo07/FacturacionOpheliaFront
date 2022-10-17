import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DevExpressModule } from '../dev-express/dev-express.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    GuardarEditarComponent,
    TablaProductosComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    DevExpressModule,
    MaterialModule
  ]
})
export class ProductoModule { }

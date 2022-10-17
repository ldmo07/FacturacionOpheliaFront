import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { GuardarEditarComponent } from './guardar-editar/guardar-editar.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DevExpressModule } from '../dev-express/dev-express.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    GuardarEditarComponent,
    TablaClientesComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    DevExpressModule,
    MaterialModule
  ]
})
export class ClienteModule { }

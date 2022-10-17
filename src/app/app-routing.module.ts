import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path :'clientes',
    loadChildren : () => import('./cliente/cliente.module').then(m=>m.ClienteModule),
   // canActivate : [ValidaLoginGuard],
   // canLoad : [ValidaLoginGuard]
  },
  {
    path:'productos',
    loadChildren : () => import('./producto/producto.module').then(m=>m.ProductoModule),
    //canActivate : [ValidaLoginGuard],
    //canLoad : [ValidaLoginGuard]
  },
  {
    path:'ventas',
    loadChildren : () => import('./ventas/ventas.module').then(m=>m.VentasModule)
  },
  {
    path :'**',
    redirectTo:'clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

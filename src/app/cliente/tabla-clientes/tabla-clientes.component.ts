import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../servicios/cliente.service';
import { Cliente } from '../../modelos/Cliente';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css']
})
export class TablaClientesComponent implements OnInit {

 //INYECTO LAS DEPENDENCIAS PARA ESTE COMPÓNENTE
 constructor(private router: Router, private clienteService: ClienteService) { }
 
 listaClientes: Cliente[] = []; //ARRAY DE CLIENTES PARA MOSTRA EL LISTADO
 verTablaDev : boolean = false; //FLAG PARA MOSTRAR U OCULTAR TABLA DE DEVEXPRESS

 ngOnInit(): void {
   this.listaClientes= [];
   this.ListarClientes();
 }

  ListarClientes(idCliente ?: string ) {
   this.listaClientes= [];
   if (idCliente?.length === 0 || idCliente === undefined) {

     //SI NO ME LLEGA ALGUN TIPO DE FILTRO LISTO TODOS LOS  Clientes
     this.clienteService.ListarClientes().subscribe((data) => {
       // ASIGNO EL OBJETO CLIENTE AL ARRAY DE CLIENTES
       this.listaClientes = [...data];
       console.log(this.listaClientes);
     });

   } else {

     //FILTRO LOS CLIENTES POR EL ID QUE ME LLEGUE
     this.clienteService.ListarClientes(idCliente).subscribe((data) => {
       // ASIGNO EL OBJETO CLIENTE AL ARRAY DE CLIENTE
       this.listaClientes = [...data];
       console.log(this.listaClientes);
     });
   }
 }

 //CAMBIA EL FLAG PARA VER SI SE DEBE MOSTRAR U OCULTAR
 mostrarTablaDev(){
  this.verTablaDev = !this.verTablaDev;
 }

 mostrarAlerta(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Estas Funcionalidades no se han desarrollado',
    showConfirmButton: false,
    timer: 1500
  })
 }

 //NAVEGA A LA VISTA PARA EDITAR UN CLIENTE
 irEditar(id:string){
    this.router.navigate(['/clientes/editar', id]);
 } 

  //NAVEGA A LA VISTA PARA AGREGAR UN CLIENTE 
  irAgregar(){
    this.router.navigate(['/clientes/guardar']);
   }

   irComprar(idCliente : string){
    this.router.navigate(['/ventas/registrar-venta', idCliente]);
   }
 

}

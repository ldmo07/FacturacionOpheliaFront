import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../../modelos/Producto';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {

  //INYECTO LAS DEPENDENCIAS PARA ESTE COMPÓNENTE
  constructor(private router: Router, private productoService: ProductoService) { }
  
  listaProductos: Producto[] = []; // ARREGLO DE PRODUCTOS PARA MOSTRAR EL LISTADO
  listaProductosAgotados: Producto[] = []; // ARREGLO DE PRODUCTOS AGOTADOS 

  verTablaDev : boolean = false; //FLAG PARA MOSTRAR TABLA DEVEXPRESS
  verAgotados : boolean = false; //FLAG PARA MOSTRAR LOS PRODUCTOS MINIMOS AGOTADOS
  verPrecios : boolean = false; //FLAG PARA MOSTRAR U OCULTAR LA TABLA DE PRECIOS
  ngOnInit(): void {
    this.listaProductos = [];
    this.ListarProductos();
  }

   ListarProductos(idProducto ?: string ) {
    this.listaProductos= [];
    if (idProducto?.length === 0 || idProducto === undefined) {

      //SI NO ME LLEGA ALGUN TIPO DE IDOPRODUCTO LISTO TODOS LOS  PRODUCTOS
      this.productoService.ListarProductos().subscribe((data) => {
        // ASIGNO EL OBJETO PRODUCTO AL ARRAY DE PRODUCTOS
        this.listaProductos = [...data];
        console.log(this.listaProductos);
      });

    } else {

      //idProducto LOS PRODUCTOS POR EL TIPO QUE ME LLEGUE
      this.productoService.ListarProductos(idProducto).subscribe((data) => {
        // ASIGNO EL OBJETO PRODUCTOS AL ARRAY DE PRODUCTOS
        this.listaProductos = [...data];
        console.log(this.listaProductos);
      });
    }
  }

  ListarProductosAgotados(idProducto ?: string ) {
    this.listaProductosAgotados= [];
    if (idProducto?.length === 0 || idProducto === undefined) {

      //SI NO ME LLEGA ALGUN TIPO DE IDPRODUCTO LISTO TODOS LOS  PRODUCTOS AGOTADOS
      this.productoService.ListarProductosMinimosPermitidos().subscribe((data) => {
        // ASIGNO EL OBJETO PRODUCTO AL ARRAY DE PRODUCTOS
        this.listaProductosAgotados = [...data];
        console.log(this.listaProductosAgotados);
      });

    } else {

      //idProducto LOS PRODUCTOS POR EL TIPO QUE ME LLEGUE
      this.productoService.ListarProductosMinimosPermitidos(idProducto).subscribe((data) => {
        // ASIGNO EL OBJETO PRODUCTOS AL ARRAY DE PRODUCTOS
        this.listaProductosAgotados = [...data];
        console.log(this.listaProductosAgotados);
      });
    }
  }
  
  //CAMBIA EL FLAG PARA VER SI SE DEBE MOSTRAR U OCULTAR
  mostrarTablaDev(){
    this.verTablaDev = !this.verTablaDev;
  }

   //CAMBIA EL FLAG PARA VER SI SE DEBE MOSTRAR U OCULTAR
  mostrarAgotados(){
    this.verAgotados = !this.verAgotados;

    if(this.verAgotados){
      this.ListarProductosAgotados();
    }
  }

     //CAMBIA EL FLAG PARA VER SI SE DEBE MOSTRAR U OCULTAR
  mostrarPrecios(){
    this.verPrecios = !this.verPrecios;
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

  //NAVEGA A LA VISTA PARA EDITAR UN PRODUCTO 
 irEditar(id:string){
  this.router.navigate(['/productos/editar', id]);
 } 

 //NAVEGA A LA VISTA PARA AGREGAR UN PRODUCTO 
 irAgregar(){
  this.router.navigate(['/productos/guardar']);
 }
  

}

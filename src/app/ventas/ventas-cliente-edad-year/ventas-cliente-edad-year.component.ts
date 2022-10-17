import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../servicios/ventas.service';
import { CompraClienteEdadDosFechas } from '../../modelos/CompraClienteEdadDosFechas';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ventas-cliente-edad-year',
  templateUrl: './ventas-cliente-edad-year.component.html',
  styleUrls: ['./ventas-cliente-edad-year.component.css']
})
export class VentasClienteEdadYearComponent implements OnInit {

   //INYECTO LAS DEPENDENCIAS PARA ESTE COMPÓNENTE
   constructor(private router: Router, private ventasService: VentasService) { }
  
   listaComprasPorEdadFechas: CompraClienteEdadDosFechas[] = []; // ARREGLO DE COMPRAS PRODUCTOS POR AÑO

 
   verTablaDev : boolean = false; //FLAG PARA MOSTRAR TABLA DEVEXPRESS

   
   ngOnInit(): void {
     this.listaComprasPorEdadFechas = [];
     this.ListarComprasClientePorEdadEntreDosFechas();
   }
 
    ListarComprasClientePorEdadEntreDosFechas(fecha1?: string, fecha2?:string,edad?:string) {
     this.listaComprasPorEdadFechas= [];
  
       //SI NO ME LLEGA ALGUN AÑO LISTO TODOS LAS VENTAS DE PRODUCTOS POR AÑO
       this.ventasService.ComprasClientePorEdadEntreDosFechas(fecha1,fecha2,edad).subscribe((data) => {
         // ASIGNO EL OBJETO VENTA PRODUCTO POR AÑO AL ARRAY 
         this.listaComprasPorEdadFechas = [...data];
         console.log(this.listaComprasPorEdadFechas);
       },(err)=>{
        Swal.fire(
          //'No se Pudo Guardar el Registro',
          '',
          'error'
        );
       });
   }

   irVentasPorYear(){
    this.router.navigate(['/ventas/ventas-year']);
   }

}

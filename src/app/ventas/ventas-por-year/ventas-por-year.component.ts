import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../servicios/ventas.service';
import { VentaPorYear } from '../../modelos/VentaPorYear';

@Component({
  selector: 'app-ventas-por-year',
  templateUrl: './ventas-por-year.component.html',
  styleUrls: ['./ventas-por-year.component.css']
})
export class VentasPorYearComponent implements OnInit {

    //INYECTO LAS DEPENDENCIAS PARA ESTE COMPÓNENTE
    constructor(private router: Router, private ventasService: VentasService) { }
  
    listaVentasProductosPorYear: VentaPorYear[] = []; // ARREGLO DE VENTAS PRODUCTOS POR AÑO

  
    verTablaDev : boolean = false; //FLAG PARA MOSTRAR TABLA DEVEXPRESS

    
    ngOnInit(): void {
      this.listaVentasProductosPorYear = [];
      this.ListarVentasProductosPorYear();
    }
  
     ListarVentasProductosPorYear(year ?: string ) {
      this.listaVentasProductosPorYear= [];
      if (year?.length === 0 || year === undefined) {
  
        //SI NO ME LLEGA ALGUN AÑO LISTO TODOS LAS VENTAS DE PRODUCTOS POR AÑO
        this.ventasService.ListarVentaProductoPorYear().subscribe((data) => {
          // ASIGNO EL OBJETO VENTA PRODUCTO POR AÑO AL ARRAY 
          this.listaVentasProductosPorYear = [...data];
          console.log(this.listaVentasProductosPorYear);
        });
  
      } else {
  
        //LISTO LA VENTAS DE LOS PRODUCTOS POR EL AÑO QUE ME LLEGUE
        this.ventasService.ListarVentaProductoPorYear(year).subscribe((data) => {
          // ASIGNO EL OBJETO VENTA PRODUCTO POR AÑO AL ARRAY
          this.listaVentasProductosPorYear = [...data];
          console.log(this.listaVentasProductosPorYear);
        });
      }
    }

    irVentasPorEdadYear(){
      this.router.navigate(['/ventas/ventas-cliente-edad-year']);
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VentaPorYear } from '../../modelos/VentaPorYear';
import { CompraClienteEdadDosFechas } from '../../modelos/CompraClienteEdadDosFechas';
import { Factura } from '../../modelos/Factura';
import { RespuestaRest } from '../../modelos/RespuestaRest';
import { DetalleFactura } from '../../modelos/DetalleFactura';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http : HttpClient) { }

  //LEO LA BASE URL DE LOS ENVIROMENT
  private baseUrl : string = environment.baseUrl;

  //LISTA VENTAS PRODUCTO POR AÑO POR DEFECTO TRAE LAS VENTA DEL 2000 SI NO SE LE PASA EL AÑO
  public ListarVentaProductoPorYear (year?: string) : Observable<VentaPorYear[]>{

    if(year?.length === 0 || year === undefined){
      return this.http.get<VentaPorYear[]>(`${this.baseUrl}/listaTotalVentasProducto`);
    }else{
      return this.http.get<VentaPorYear[]>(`${this.baseUrl}/listaTotalVentasProducto?year=${year}`);
    }
    
  }

  //LISTA LAS COMPRAS DE LOS CLIENTES CON X EDA ENTRE DOS FECHAS POR DEFECTO TRAERA LAS COMPAR
  // 01/02/200 Y EL 25/05/2000
  public ComprasClientePorEdadEntreDosFechas (fecha1?: string, fecha2?:string,edad?:string) : Observable<CompraClienteEdadDosFechas[]>{
    console.log("f1",fecha1," f2",fecha2, " ed",edad)
    if(fecha1?.length! > 0 && fecha2?.length! >0 && edad?.length! >0){
      return this.http.get<CompraClienteEdadDosFechas[]>(`${this.baseUrl}/listaClientesMenorEdadMes?fecha1=${fecha1}&fecha2=${fecha2}&edad=${edad}`);
      console.log("#1")
    }else if(fecha1?.length! > 0 && fecha2?.length! >0 && edad?.length===0){
      return this.http.get<CompraClienteEdadDosFechas[]>(`${this.baseUrl}/listaClientesMenorEdadMes?fecha1=${fecha1}&fecha2=${fecha2}`);
      console.log("#2")
    }else{
      console.log("#3")
      return this.http.get<CompraClienteEdadDosFechas[]>(`${this.baseUrl}/listaClientesMenorEdadMes?fecha1=2000-02-01&fecha2=2000-05-25&edad=35`);
    }
    
  }

  //GUARDA UNA FACTURA
  public GuardarFactura (factura :Factura) : Observable<RespuestaRest>{
    const { idCliente,fechaCompra } = factura;
    const body = { idCliente, fechaCompra};
    return this.http.post<RespuestaRest>(`${this.baseUrl}/InsertarFactura`,body);
  }

  //GUARDA LOS DETALLE DE FACTURA
  public GuardarDetallesFactura (detalles :DetalleFactura[]) : Observable<RespuestaRest>{
    //const { idCliente,fechaCompra } = factura;
    const body = detalles;
    return this.http.post<RespuestaRest>(`${this.baseUrl}/InsertarVenta`,body);
  }
}

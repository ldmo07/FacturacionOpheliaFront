import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/modelos/Producto';
import { Observable } from 'rxjs';
import { RespuestaRest } from '../../modelos/RespuestaRest';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private http : HttpClient) { }

    //LEO LA BASE URL DE LOS ENVIROMENT
    private baseUrl : string = environment.baseUrl;

    //LISTA PRODUCTOS O UNO EN ESPECIFICO SEGUN EL ID
    public ListarProductos (idProducto?: string) : Observable<Producto[]>{

      if(idProducto?.length === 0 || idProducto === undefined){
        return this.http.get<Producto[]>(`${this.baseUrl}/listaPreciosProductos`);
      }else{
        return this.http.get<Producto[]>(`${this.baseUrl}/listaPreciosProductos?idProducto=${idProducto}`);
      }
      
    }

    //GUARDA UN PRODUCTO
    public GuardarProducto(producto : Producto) : Observable<RespuestaRest>{
      const { nombre,  precio  , stock } = producto; //DESESTRUCTURO LA INFORMACION
      const body = { nombre,  precio  , stock}; //ARMO EL BODY QUE SE LE ENVIARA A LA PETICION POST
      return this.http.post<RespuestaRest>(`${this.baseUrl}/InsertarProducto`,body);
    }

    //LISTA PRODUCTOS QUE ESTAN AGOTADOS O UNO EN ESPECIFICO SEGUN EL ID SI ESTA AGOTADO
    public ListarProductosMinimosPermitidos (idProducto?: string) : Observable<Producto[]>{

      if(idProducto?.length === 0 || idProducto === undefined){
        return this.http.get<Producto[]>(`${this.baseUrl}/listaProductosMinimoPermitido`);
      }else{
        return this.http.get<Producto[]>(`${this.baseUrl}/listaProductosMinimoPermitido?idProducto=${idProducto}`);
      }
      
    }

    //EDITA UN PRODUCTO
    public EditarProducto(producto : Producto,id:string) : Observable<RespuestaRest>{
      producto.idProducto = parseInt(id);
      const { nombre,  precio  , stock,idProducto } = producto; //DESESTRUCTURO LA INFORMACION
      const body = { nombre,  precio  , stock,idProducto}; //ARMO EL BODY QUE SE LE ENVIARA A LA PETICION POST
      return this.http.put<RespuestaRest>(`${this.baseUrl}/UpdateProducto`,body);
    }
}

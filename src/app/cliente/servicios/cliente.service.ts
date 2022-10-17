import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../../modelos/Cliente';
import { RespuestaRest } from '../../modelos/RespuestaRest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  //LEO LA BASE URL DE LOS ENVIROMENT
  private baseUrl : string = environment.baseUrl;

 //LISTA LOS CLIENTE O UNO SI SE LE SUMINISTRA EL ID
     public ListarClientes (idCliente?: string) : Observable<Cliente[]>{

      if(idCliente?.length === 0 || idCliente === undefined){
        return this.http.get<Cliente[]>(`${this.baseUrl}/listaClientes`);
      }else{
        return this.http.get<Cliente[]>(`${this.baseUrl}/listaClientes?idCliente=${idCliente}`);
      }
      
    }

  //GUARDA UN CLIENTE
  public GuardarCliente (cliente : Cliente) : Observable<RespuestaRest>{
    const { nombre,  apellido  , edad, direccion } = cliente;
    const body = { nombre,  apellido  , edad, direccion};
    return this.http.post<RespuestaRest>(`${this.baseUrl}/InsertarCliente`,body);
  }

  //EDITA UN CLIENTE
  public EditarCliente (cliente : Cliente,id:string) : Observable<RespuestaRest>{
    cliente.idCliente = parseInt(id);
    const { nombre,  apellido  , edad, direccion, idCliente } = cliente;
    const body = { nombre,  apellido  , edad, direccion,idCliente};
    return this.http.put<RespuestaRest>(`${this.baseUrl}/UpdateCliente`,body);
  }

}

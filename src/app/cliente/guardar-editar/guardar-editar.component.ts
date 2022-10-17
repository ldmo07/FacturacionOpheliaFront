import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../servicios/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../modelos/Cliente';

@Component({
  selector: 'app-guardar-editar',
  templateUrl: './guardar-editar.component.html',
  styleUrls: ['./guardar-editar.component.css'],
})
export class GuardarEditarComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {}


   //Formulario Reactivo
   miFormulario : FormGroup = this.fb.group({
    apellido : ['',[Validators.required,Validators.minLength(5)]],
    nombre : ['',[Validators.required,Validators.minLength(5)]],
    edad : [10,[Validators.required,Validators.min(10)]],
    direccion : ['',Validators.required],
  });

  //FLAG QUE INDICARA QUE ACCION SE VA HACER
  tarea:string="Guardar";
  id : string="";
  //OBJETO DE TIPO CLIENTE
  cliente  = {} as Cliente;

  ngOnInit(): void {
    this.setearValoresClienteUpdate();
  }

  //VALIDA SI LLEGA UN ID POR URL Y SI ES ASI SETEA LOS VALORES DEL CLIENTE
  setearValoresClienteUpdate(){
    this.activatedRoute.params.subscribe(param =>{
      if(param['id'] != undefined){
        //capturo el id y la tarea
        this.id = param['id'];
        this.tarea = "Editar";
        //Me suscribo y obtengo el cliente por id
        this.clienteService.ListarClientes(this.id).subscribe(data =>{
          this.cliente = data[0];
          
          //SETEO valores al formulario si se va a editar
          this.miFormulario.setValue({
            nombre: this.cliente.nombre,
            apellido : this.cliente.apellido,
            edad : this.cliente.edad,
            direccion : this.cliente.direccion,
          });
        });
      }
      
     });  
  }

  //SI EL ID NO ES VACIO EDITA SINO GUARDA
  guardarEditar(){
    if(this.id.length>0){
      this.editarCliente();
    }else{
      this.guardarCliente();
    }
  }

  guardarCliente() {
    //LLAMO EL SERVICIO  PARA GUARDAR UN CLIENTE
    this.clienteService.GuardarCliente(this.miFormulario.value).subscribe(
      (data) => {
        if (data.Mensaje == 'ok') {
          //MUESTRO LA ALERTA QUE TODO SE DIO CORRECTAMENTE
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.Detalle, //'Cliente Guardado con exito',
            showConfirmButton: false,
            timer: 1500,
          });

          //HAGO REDIRECCION HACIA LA TABLA DE CLIENTES LUEGO DE 2 SEGUNDOS
          setTimeout(() => {
            this.router.navigateByUrl('/clientes/tabla-clientes');
          }, 2000);
        }
      },
      (err) => {
        //MUESTRO UN MENSAJE DE ERROR EN CASO DE QUE NO SE HAYA PODIDO REALIZAR EL PROCESO
        Swal.fire(
          //'No se Pudo Guardar el Registro',
          '',
          'error'
        );
      }
    );
  }

  editarCliente(){
   /* */
    this.clienteService.EditarCliente(this.miFormulario.value,this.id).subscribe(data=>{
      if(data.Mensaje='ok'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.Detalle,
          showConfirmButton: false,
          timer: 1500,
        });
        
        //HAGO LA REDIRECCION
        this.router.navigate(['/clientes/tabla-clientes']);
      }
    })
  }

  //Validaciones de Campo
  validacionCampos(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }
}

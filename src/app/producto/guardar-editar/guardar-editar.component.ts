import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../servicios/producto.service';
import { Producto } from '../../modelos/Producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-editar',
  templateUrl: './guardar-editar.component.html',
  styleUrls: ['./guardar-editar.component.css']
})
export class GuardarEditarComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {}


   //Formulario Reactivo
   miFormulario : FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(5)]],
    precio : [100,[Validators.required,Validators.min(100)]],
    stock : [5,[Validators.required,Validators.min(5)]],
  });

  //FLAG QUE INDICARA QUE ACCION SE VA HACER
  tarea:string="Guardar";
  id : string="";
  //OBJETO DE TIPO Producto
  producto  = {} as Producto;

  ngOnInit(): void {
    this.setearValoresProductoUpdate();
  }

  //VALIDA SI LLEGA UN ID POR URL Y SI ES ASI SETEA LOS VALORES DEL Producto
  setearValoresProductoUpdate(){
    this.activatedRoute.params.subscribe(param =>{
      if(param['id'] != undefined){
        //capturo el id y la tarea
        this.id = param['id'];
        this.tarea = "Editar";
        //Me suscribo y obtengo el Producto por id
        this.productoService.ListarProductos(this.id).subscribe(data =>{
          this.producto = data[0];
          
          //SETEO valores al formulario si se va a editar
          this.miFormulario.setValue({
            nombre: this.producto.nombre,
            precio : this.producto.precio,
            stock : this.producto.stock
          });
        });
      }
      
     });  
  }

  //SI EL ID NO ES VACIO EDITA SINO GUARDA
  guardarEditar(){
    if(this.id.length>0){
      this.editarProducto();
    }else{
      this.guardarProducto();
    }
  }

  guardarProducto() {
    //LLAMO EL SERVICIO  PARA GUARDAR UN Producto
    this.productoService.GuardarProducto(this.miFormulario.value).subscribe(
      (data) => {
        if (data.Mensaje == 'ok') {
          //MUESTRO LA ALERTA QUE TODO SE DIO CORRECTAMENTE
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.Detalle, //'Producto Guardado con exito',
            showConfirmButton: false,
            timer: 1500,
          });

          //HAGO REDIRECCION HACIA LA TABLA DE ProductoS LUEGO DE 2 SEGUNDOS
          setTimeout(() => {
            this.router.navigateByUrl('/productos/tabla-Productos');
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

  editarProducto(){

    this.productoService.EditarProducto(this.miFormulario.value,this.id).subscribe(data=>{
      if(data.Mensaje==='ok'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.Detalle,
          showConfirmButton: false,
          timer: 1500,
        });

        //HAGO LA REDIRECCION
        this.router.navigateByUrl('/productos/tabla-Productos');
      }
    })
  }

  //Validaciones de Campo2
  validacionCampos(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

}

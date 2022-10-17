import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from '../servicios/ventas.service';
import { Factura } from '../../modelos/Factura';
import { DetalleFactura } from '../../modelos/DetalleFactura';
import { Producto } from '../../modelos/Producto';
import { ProductoService } from '../../producto/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.css']
})
export class RegistrarVentaComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ventasService: VentasService,
    private productoService: ProductoService,
    private router: Router,
  ) {
    
  }

  factura = {} as Factura;
  listaDetalles: DetalleFactura[] = []; //ARRAY DE DETALLES DE LA COMPRA
  detalle = {} as DetalleFactura; 
  listaProductos : Producto[] = []; //ARRAY DE PRODUCTOS
  id : number = 0;

   //Formulario Reactivo
   miFormulario : FormGroup = this.fb.group({
    idCliente :['',Validators.required],
    idProducto:['',Validators.required],
    cantidad : ['',Validators.required],
    fechaCompra:['',Validators.required]
  });

  //FLAG QUE INDICARA QUE ACCION SE VA HACER
  tarea:string="Guardar";

  //OBJETO DE TIPO CLIENTE
  //venta  = {} as Venta;
  ngOnInit(): void {
      this.capturarIdCliente(); 
      this.ListarProductos();
      
  }

  guardarVenta(){
    //CREO EL OBJETO FACTURA
    const {fechaCompra} = this.miFormulario.value;
    this.factura.fechaCompra = fechaCompra;
    this.factura.idCliente = this.id;

    this.ventasService.GuardarFactura(this.factura).subscribe(data=>{
      //SI SE GUARDA LA FACTURA MANDO A GUARDAR LOS DETALLES
      if(data.Mensaje==='ok'){
        console.log("Se Guardo la factura")
        this.ventasService.GuardarDetallesFactura(this.listaDetalles).subscribe(det=>{
          if(det.Mensaje==='ok'){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: det.Detalle,
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: det.Detalle,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
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

    //Captura el Id del CLiente por la url
    capturarIdCliente(){
      this.activatedRoute.params.subscribe(param =>{

          //capturo el id y la tarea
          this.id = param['idCliente']; 
          this.miFormulario.patchValue({idCliente:this.id});           
       });  
    }

    ListarProductos() {
      this.productoService.ListarProductos().subscribe(data=>{
        this.listaProductos = [...data];
      })
    }

    agregarDetalleCompra(){
      const {idProducto,cantidad} = this.miFormulario.value;
      this.listaDetalles.push({idProducto:idProducto,cantidad:cantidad/*,idDetalleFactura:0,idFactura:0*/});
      this.miFormulario.get('idProducto')?.reset();
      this.miFormulario.get('cantidad')?.reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agrego el producto',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(this.listaDetalles);
    }

    vaciarCarrito(){
      Swal.fire({
        title: 'Seguro que desea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:'No!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Su carrito esta vacio',
            '',
            'success'
          )
          this.listaDetalles = [];
        }
      })
      
    }

}

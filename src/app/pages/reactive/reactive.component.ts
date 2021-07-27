import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {
  //la idea con lso formularios de reactivos es tener la mejor cantida de configuracion en el template
  //es mayor recomendado trabajar con formularios reactivos

  forma:FormGroup;
  //si tiene mas de dos lineas en el codigo se recomienda crear una funcion
  constructor(private fb:FormBuilder) {
    this.crearFormulario();
    //carga de datos inicial
    this.cargarDataFormulario();
  }

  cargarDataFormulario() {
    //cuando se usa el setvalue toca establecerle un valor a cada una de sus propiedades
    // this.forma.setValue({
    //   nombre:'luis',
    //   apellido:'reales',
    //   correo:'luisreales@hotmail.com',
    //   direccion: {
    //       distrito:'atlantico',
    //       ciudad:'barranquilla'
    //   },
    //   pasatiempos:this.fb.array([''])

    // });

    //cuando se usa el reset, solo actualiza la propiedad que se quiere
    // this.forma.reset({
    //   nombre:'pedro',
    //   apellido:'guzaman',
    // });

    // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  //get para el listado de campos del array dinamicos
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }


  ngOnInit(): void {
  }

  crearFormulario(){
    //formbuilder>creador de formularios reactivos
    //group necesita un objeto que va a construir los constroles
    //nombre_control:['valor_por defecto','validaciones_sincronas','validaciones_asincronas']
    this.forma = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['', Validators.required],
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      direccion: this.fb.group({
          distrito:['',Validators.required],
          ciudad:['',Validators.required]
      }),
      pasatiempos:this.fb.array([
        []
      ])
    });

    //trabajando con arreglos dentro del objeto, se usa arraygroup
  }

  agregarPasatiempo(){
      this.pasatiempos.push(this.fb.control('',Validators.required));
  }

  eliminarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
}

  guardar(){
    console.log(this.forma.value);


    if(this.forma.invalid){
        Object.values(this.forma.controls).forEach(control => {

          if(control instanceof FormGroup){
            //recorrer los hijos del formgroup que tiene internos
            Object.values(control.controls).forEach( control => control.markAllAsTouched());


          }else{
            control.markAsTouched();
          }


        });
    }
  }



}

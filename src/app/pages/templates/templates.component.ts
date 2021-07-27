import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  //form-control ng-pristine ng-valid ng-touched, clases css de formulario de template
  //despues de agregar valor al campo se cambia la clase ng-valid ng-dirty ng-touched
 // la mayhor parte de la configuracion de los formularios por template se hace en el html de
 //referecia al mismo se usa # y el tipo que se va usar, #forma="ngForm"
 //[ngModel] con llaves cuadradas es para recibir informacion en una sola vida, [ngModel]="usuario.nombre"
 //[(ngModel)] se actualiza en doble via

  usuario = {
    nombre:'',
    apellido:'',
    email:'',
    pais:'COL',
    genero:''

  }

  //listado de paises
  paises:any[] = [];

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paisService
          .getPaises()
          .subscribe(data => {
              this.paises = data;
              this.paises.unshift({
                nombre:'[Seleccione Pais]',
                codigo:''
              });
              console.log(this.paises);
          });

  }

  guardar(forma:NgForm){
    console.log('submit disparado',forma);
    console.log('submit disparado',forma.value);
    if(forma.invalid) {
        Object.values(forma.controls).forEach(control => {
          control.markAsTouched();
        });
    }
  }
}

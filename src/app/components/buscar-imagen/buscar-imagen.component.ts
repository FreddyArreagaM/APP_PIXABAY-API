import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {
  nombreImagen : string ;


  constructor(private _imagenService: ImagenService){
    this.nombreImagen = '';
  }

  buscarImagenes(){
    if(this.nombreImagen === ''){
      //Envío del mensaje para el observable error
      this._imagenService.setError("Agregar un texto en el cuadro de busqueda");
    }else{
      this._imagenService.setTerminoBusqueda(this.nombreImagen);
    }
  }
}

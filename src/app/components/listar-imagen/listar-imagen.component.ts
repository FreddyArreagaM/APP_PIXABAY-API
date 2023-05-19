import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {
  termino = '';
  subcription : Subscription;
  listImagenes : any[] = [];
  loading: boolean = false;
  paginaActual = 1;
  calculoTotalPagina = 0;
  imagenesporPagina = 28;


  constructor(private _imagenService: ImagenService){
    this.subcription=this._imagenService.getTerminaoBusqueda().subscribe(data =>{
      this.termino = data;
      this.loading = true;
      this.reset();
      setTimeout(()=>{
        this.obtenerImagenes();
      },1500);
    })
  }

  obtenerImagenes(){
    this._imagenService.getImagenes(this.termino, this.imagenesporPagina, this.paginaActual).subscribe(data =>{
      console.log(data);
      this.loading = false;
      if(data.hits.length === 0){
        this._imagenService.setError("Opss.. no encontramos ningun resultado");    
      }else{
        this.listImagenes = data.hits;
      }
      this.calculoTotalPagina = Math.ceil(data.totalHits / this.imagenesporPagina);
      console.log(this.calculoTotalPagina);

    }, error =>{
      this._imagenService.setError("Opss.. ocurrió un error");
      this.loading = false;
    })
  }

  paginaAnterior(){
    if(this.paginaActual > 1 ){
      this.paginaActual--;
      this.obtenerImagenes();
    }
  }

  paginaPosterior(){
    if(this.paginaActual < this.calculoTotalPagina){
      this.paginaActual++;
      this.obtenerImagenes();
    }  
  }

  reset(){
    this.listImagenes = [];
    this.paginaActual = 1 ;
  }

}

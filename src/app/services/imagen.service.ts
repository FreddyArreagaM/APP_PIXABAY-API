import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  //Declaración de variable observable
  private $error = new Subject<string>();

  //Declaración de variable que recibe el término de busqueda.
  private $terminoBusqueda = new Subject <string>();

  constructor(private http: HttpClient) {

  }

  //Metodo para asignar el texto del mensaje
  setError(mensaje: string){
    this.$error.next(mensaje);
  }

  //(Obtener valor error) Metodo para realizar observable a la variable y que todos los componentes que se subscriban a el puedan escuchar sus cambios.
  getError(): Observable<string>{
    return this.$error.asObservable();
  }

  //Metodo para asignar en el observable el termino de busqueda obtenido del input
  setTerminoBusqueda(termino: string){
    this.$terminoBusqueda.next(termino);
  }

  //(Obtener valor terminoBusqueda) Metodo para realizar observable a la variable y que todos los componentes que se subscriban a el puedan escuchar sus cambios.
  getTerminaoBusqueda(): Observable<string>{
    return this.$terminoBusqueda.asObservable();
  }

  //(Obtener las datos de la API)
  getImagenes(termino: string, imagenesporPagina : number, paginaActual: number): Observable<any>{
    const KEY = '36489745-7e300252b838e5ac1e70ad825'
    const URL = 'https://pixabay.com/api/?key='+KEY+'&q='+termino+'&per_page='+imagenesporPagina+'&page='+paginaActual;

    //Metodo http para obtener los datos del API
    return this.http.get(URL);
  }

}

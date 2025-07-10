import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Franquicia } from '../core/models/franquicia.model';
import { environment } from '../../environments/environment.development';

const BASE_URL = `${environment.apiUrl}`;;
@Injectable({
  providedIn: 'root'
})
export class FranquiciaService {
  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }

  crear(data: any): Observable<any> {
    return this.http.post<any>(BASE_URL, data);
  }

  actualizarNombre(id: string, nombre: string): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}/nombre`, { nombre });
  }

  agregarSucursal(franquiciaId: string, sucursal: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${franquiciaId}/sucursales`, sucursal);
  }

  actualizarNombreSucursal(franquiciaId: string, antiguo: string, nuevo: string): Observable<any> {
    return this.http.put(`${BASE_URL}/${franquiciaId}/sucursales/${antiguo}/nombre`, { nombre: nuevo });
  }

  agregarProducto(franquiciaId: string, sucursalId: string, producto: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${franquiciaId}/sucursales/${sucursalId}/productos`, producto);
  }

  actualizarNombreProducto(franquiciaId: string, sucursalNombre: string, productoAntiguo: string, nuevo: string): Observable<any> {
    return this.http.put(`${BASE_URL}/${franquiciaId}/sucursales/${sucursalNombre}/productos/${productoAntiguo}/nombre`, { nombre: nuevo });
  }
}

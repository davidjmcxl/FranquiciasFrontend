import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FranquiciaService } from '../../services/franquicia.service';
import { Franquicia, Sucursal, Producto } from '../../core/models/franquicia.model';

@Component({
  selector: 'app-franquicia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './franquicia.component.html',
  styleUrl: './franquicia.component.scss',
})
export class FranquiciaComponent {
  franquiciaService = inject(FranquiciaService);
  franquicias = signal<Franquicia[]>([]);
  nuevaFranquicia = '';
  selectedFranquicia: Franquicia | null = null;
  nuevaSucursal = '';
  selectedSucursal: Sucursal | null = null;
  nuevoProductoNombre = '';
  nuevoProductoPrecio: number | null = null;
  selectedFranquiciaId: string | null = null;
  selectedSucursalNombre: string | null = null;
  ngOnInit() {
    this.cargarFranquicias();
  }

  cargarFranquicias() {
    this.franquiciaService.listar().subscribe((data) => this.franquicias.set(data));
  }

  agregarFranquicia() {
    if (!this.nuevaFranquicia.trim()) return;
    this.franquiciaService
      .crear({ nombre: this.nuevaFranquicia })
      .subscribe(() => {
        this.nuevaFranquicia = '';
        this.cargarFranquicias();
      });
  }

  seleccionarFranquicia(franq: Franquicia) {
    if (this.selectedFranquiciaId === franq.id) {
      this.selectedFranquiciaId = null;
      this.selectedSucursalNombre = null;
    } else {
      this.selectedFranquiciaId = franq.id!;
      this.selectedSucursalNombre = null;
    }
    this.selectedFranquicia = franq;
  }


  agregarSucursal() {
    if (!this.nuevaSucursal.trim() || !this.selectedFranquicia?.id) return;
    this.franquiciaService
      .agregarSucursal(this.selectedFranquicia.id, { nombre: this.nuevaSucursal })
      .subscribe(() => {
        this.nuevaSucursal = '';
        this.cargarFranquicias();
      });
  }

  seleccionarSucursal(suc: Sucursal) {
    if (this.selectedSucursalNombre === suc.nombre) {
      this.selectedSucursalNombre = null;
    } else {
      this.selectedSucursalNombre = suc.nombre;
    }
    this.selectedSucursal = suc;
  }

  agregarProducto() {
    if (
      !this.nuevoProductoNombre.trim() ||
      this.nuevoProductoPrecio == null ||
      !this.selectedFranquicia?.id ||
      !this.selectedSucursal
    )
      return;

    this.franquiciaService
      .agregarProducto(this.selectedFranquicia.id, this.selectedSucursal.nombre, {
        nombre: this.nuevoProductoNombre,
        precio: this.nuevoProductoPrecio,
      })
      .subscribe(() => {
        this.nuevoProductoNombre = '';
        this.nuevoProductoPrecio = null;
        this.cargarFranquicias();
      });
  }
}

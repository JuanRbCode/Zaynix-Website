import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-accesibilidad',
  styleUrl: './legal.scss',
  templateUrl: './accesibilidad.html',
})
export class Accesibilidad {
  protected readonly repositorio = REPOSITORIO;
}

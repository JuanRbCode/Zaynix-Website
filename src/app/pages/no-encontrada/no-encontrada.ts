import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-no-encontrada',
  styleUrl: '../legal/legal.scss',
  template: `
    <h1>Página no encontrada</h1>
    <p>Esa dirección no existe o cambió de lugar.</p>
    <p><a routerLink="/">Volver al inicio</a></p>
  `,
})
export class NoEncontrada {}

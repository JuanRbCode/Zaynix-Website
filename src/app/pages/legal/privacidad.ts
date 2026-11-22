import { Component } from '@angular/core';
import { REPOSITORIO } from '../../sitio';

@Component({
  selector: 'app-privacidad',
  styleUrl: './legal.scss',
  templateUrl: './privacidad.html',
})
export class Privacidad {
  protected readonly repositorio = REPOSITORIO;
}

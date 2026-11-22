import { Component } from '@angular/core';
import { REPOSITORIO } from '../../sitio';

@Component({
  selector: 'app-licencias',
  styleUrl: './legal.scss',
  templateUrl: './licencias.html',
})
export class Licencias {
  protected readonly repositorio = REPOSITORIO;
}

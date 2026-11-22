import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-terminos',
  styleUrl: './legal.scss',
  templateUrl: './terminos.html',
})
export class Terminos {
  protected readonly repositorio = REPOSITORIO;
}

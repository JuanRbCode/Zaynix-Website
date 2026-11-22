import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-pie',
  styleUrl: './pie.scss',
  templateUrl: './pie.html',
})
export class Pie {
  protected readonly repositorio = REPOSITORIO;
}

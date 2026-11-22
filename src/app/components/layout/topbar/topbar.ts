import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-topbar',
  styleUrl: './topbar.scss',
  templateUrl: './topbar.html',
})
export class Topbar {
  protected readonly repositorio = REPOSITORIO;
}

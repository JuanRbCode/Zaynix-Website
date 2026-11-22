import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly repositorio = REPOSITORIO;
  protected readonly autor = 'https://github.com/JuanRbCode';
}

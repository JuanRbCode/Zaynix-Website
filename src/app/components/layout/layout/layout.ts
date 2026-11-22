import { Component } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Pie } from '../pie/pie';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Topbar, Pie, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {
  protected saltar(evento: Event, destino: HTMLElement): void {
    evento.preventDefault();
    destino.focus();
    destino.scrollIntoView();
  }
}

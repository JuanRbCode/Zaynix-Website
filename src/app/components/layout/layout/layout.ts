import { Component, afterNextRender, signal } from '@angular/core';
import { Topbar } from '../topbar/topbar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Topbar, Footer, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
  host: { '(window:scroll)': 'alDesplazar()' },
})
export class Layout {
  protected readonly desplazado = signal(false);

  constructor() {
    afterNextRender(() => this.alDesplazar());
  }

  protected alDesplazar(): void {
    this.desplazado.set(window.scrollY > 8);
  }

  protected saltar(evento: Event, destino: HTMLElement): void {
    evento.preventDefault();
    destino.focus();
    destino.scrollIntoView();
  }
}

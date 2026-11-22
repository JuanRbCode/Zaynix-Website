import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-topbar',
  styleUrl: './topbar.scss',
  templateUrl: './topbar.html',
  host: {
    '(document:click)': 'clicFuera($event)',
    '(keydown.escape)': 'cerrarConEscape()',
    '(focusout)': 'focoFuera($event)',
  },
})
export class Topbar {
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly boton = viewChild.required<ElementRef<HTMLButtonElement>>('botonMenu');
  protected readonly repositorio = REPOSITORIO;
  protected readonly abierto = signal(false);

  protected alternar(): void {
    this.abierto.update((v) => !v);
  }

  protected cerrar(): void {
    this.abierto.set(false);
  }

  protected cerrarConEscape(): void {
    if (!this.abierto()) return;
    this.cerrar();
    this.boton().nativeElement.focus();
  }

  protected clicFuera(evento: Event): void {
    if (!this.elemento.contains(evento.target as Node)) this.cerrar();
  }

  protected focoFuera(evento: FocusEvent): void {
    if (evento.relatedTarget && !this.elemento.contains(evento.relatedTarget as Node)) this.cerrar();
  }
}

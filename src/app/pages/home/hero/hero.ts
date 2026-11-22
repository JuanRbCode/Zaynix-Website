import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { VersionService } from '../../../services/version';

@Component({
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  host: { '(pointermove)': 'mover($event)', '(pointerleave)': 'centrar()' },
})
export class Hero {
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly version = inject(VersionService);
  protected readonly info = this.version.info;
  protected readonly tamano = computed(() => {
    const bytes = this.info()?.tamano;
    return bytes ? `${(bytes / 1_048_576).toFixed(0)} MB` : '';
  });

  protected readonly pausada = signal(false);
  protected readonly ventajas = [
    { titulo: 'Descarga', texto: 'Audio y video de tus enlaces', icono: 'M12 3v12m0 0 5-5m-5 5-5-5M4 20h16' },
    { titulo: 'Convierte', texto: '7 formatos de audio y video', icono: 'M4 8h13m0 0-4-4m4 4-4 4M20 16H7m0 0 4-4m-4 4 4 4' },
    { titulo: 'Hasta 4K', texto: 'Si el video la tiene', icono: 'M3 5h18v12H3zM8 21h8M12 17v4' },
    { titulo: 'Listas completas', texto: 'Baja la lista entera', icono: 'M4 6h12M4 11h12M4 16h7M16 14v6l5-3z' },
    { titulo: 'Sin molestias', texto: 'No pide cuenta ni trae anuncios', icono: 'M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6zM9 12l2 2 4-4' },
    { titulo: 'Código abierto', texto: 'Está todo en GitHub', icono: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16' },
  ];

  protected mover(evento: PointerEvent): void {
    if (evento.pointerType !== 'mouse') return;
    const caja = this.elemento.getBoundingClientRect();
    this.profundidad(
      (evento.clientX - caja.left) / caja.width - 0.5,
      (evento.clientY - caja.top) / caja.height - 0.5,
    );
  }

  protected centrar(): void {
    this.profundidad(0, 0);
  }

  private profundidad(x: number, y: number): void {
    this.elemento.style.setProperty('--mx', x.toFixed(3));
    this.elemento.style.setProperty('--my', y.toFixed(3));
  }
}

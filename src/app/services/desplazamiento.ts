import { DOCUMENT, Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DesplazamientoService {
  private readonly router = inject(Router);
  private readonly ventana = inject(ViewportScroller);
  private readonly documento = inject(DOCUMENT);
  private readonly enNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  iniciar(): void {
    if (!this.enNavegador) return;
    afterNextRender(() => {
      setTimeout(() => {
        const seccion = this.seccionActual();
        if (seccion) this.documento.getElementById(seccion)?.scrollIntoView({ behavior: 'instant' });
      }, 150);
    });
    this.ventana.setHistoryScrollRestoration('manual');
    this.router.events.pipe(filter((e) => e instanceof Scroll)).subscribe((e) => {
      const posicion = e.position;
      const seccion = this.seccionActual();
      setTimeout(() => {
        if (posicion) this.ventana.scrollToPosition(posicion, { behavior: 'instant' });
        else if (seccion) this.documento.getElementById(seccion)?.scrollIntoView();
        else this.ventana.scrollToPosition([0, 0]);
      });
    });
  }

  private seccionActual(): string | undefined {
    let ruta = this.router.routerState.snapshot.root;
    while (ruta.firstChild) ruta = ruta.firstChild;
    return ruta.data['seccion'];
  }
}

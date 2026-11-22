import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITIO } from '../sitio';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly ruta = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private readonly documento = inject(DOCUMENT);

  iniciar(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.actualizar());
  }

  private actualizar(): void {
    let actual = this.ruta;
    while (actual.firstChild) actual = actual.firstChild;
    const datos = actual.snapshot.data;
    const indexar = datos['indexar'] !== false;
    const camino: string = datos['canonica'] ?? this.router.url.split(/[?#]/)[0];
    const url = SITIO + (camino === '/' ? '/' : camino.replace(/\/$/, ''));

    if (datos['descripcion']) {
      this.meta.updateTag({ name: 'description', content: datos['descripcion'] });
      this.meta.updateTag({ property: 'og:description', content: datos['descripcion'] });
    }
    this.meta.updateTag({ name: 'robots', content: indexar ? 'index, follow' : 'noindex' });
    this.meta.updateTag({ property: 'og:title', content: actual.snapshot.title ?? 'Zaynix' });
    this.meta.updateTag({ property: 'og:url', content: url });

    let canonica = this.documento.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!indexar) {
      canonica?.remove();
      return;
    }
    if (!canonica) {
      canonica = this.documento.createElement('link');
      canonica.setAttribute('rel', 'canonical');
      this.documento.head.appendChild(canonica);
    }
    canonica.setAttribute('href', url);
  }
}

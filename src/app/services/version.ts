import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REPOSITORIO } from '../sitio';

export interface InfoVersion {
  version: string;
  fecha?: string;
  descarga: string;
  archivo?: string | null;
  tamano?: number | null;
  sha256?: string | null;
  notas?: string;
  pagina?: string;
}

@Injectable({ providedIn: 'root' })
export class VersionService {
  readonly repositorio = REPOSITORIO;
  readonly info = signal<InfoVersion | null>(null);
  private readonly enNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  private cargada = false;

  async cargar(): Promise<void> {
    if (this.cargada || !this.enNavegador) return;
    this.cargada = true;
    try {
      const r = await fetch('/version.json', { cache: 'no-store' });
      if (r.ok) this.info.set(await r.json());
    } catch {
      this.cargada = false;
    }
  }
}

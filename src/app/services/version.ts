import { Injectable, signal } from '@angular/core';

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
  readonly repositorio = 'https://github.com/JuanRbCode/Zaynix';
  readonly info = signal<InfoVersion | null>(null);
  private cargada = false;

  async cargar(): Promise<void> {
    if (this.cargada) return;
    this.cargada = true;
    try {
      const r = await fetch('/version.json', { cache: 'no-store' });
      if (r.ok) this.info.set(await r.json());
    } catch {
      this.cargada = false;
    }
  }
}

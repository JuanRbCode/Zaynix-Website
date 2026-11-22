import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Estado {
  total: number;
  marcado: boolean;
}

@Component({
  imports: [RouterLink],
  selector: 'app-me-gusta',
  styleUrl: './me-gusta.scss',
  templateUrl: './me-gusta.html',
})
export class MeGusta implements OnInit {
  private readonly enNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly estado = signal<Estado | null>(null);
  protected readonly disponible = signal(true);
  protected readonly enviando = signal(false);
  protected readonly error = signal(false);
  protected readonly mensaje = computed(() => {
    if (this.error()) return 'No se pudo guardar. Prueba otra vez.';
    const total = this.estado()?.total;
    if (total === undefined) return '\u00a0';
    if (total === 0) return 'Todavía nadie lo ha marcado. Puedes empezar tú.';
    if (total === 1) return 'A 1 persona le gusta Zaynix.';
    return `A ${total.toLocaleString('es')} personas les gusta Zaynix.`;
  });

  async ngOnInit(): Promise<void> {
    if (!this.enNavegador) return;
    try {
      this.estado.set(await this.pedir('GET'));
    } catch {
      this.disponible.set(false);
    }
  }

  protected async marcar(): Promise<void> {
    if (this.enviando() || !this.estado() || this.estado()?.marcado) return;
    this.enviando.set(true);
    this.error.set(false);
    try {
      this.estado.set(await this.pedir('POST'));
    } catch {
      this.error.set(true);
    } finally {
      this.enviando.set(false);
    }
  }

  private async pedir(method: 'GET' | 'POST'): Promise<Estado> {
    const r = await fetch('/api/me-gusta', { method, cache: 'no-store' });
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  }
}

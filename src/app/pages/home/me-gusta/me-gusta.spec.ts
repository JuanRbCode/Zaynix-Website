import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { MeGusta } from './me-gusta';

const respuesta = (estado: number, datos: unknown) => new Response(JSON.stringify(datos), { status: estado });

async function crear() {
  await TestBed.configureTestingModule({ imports: [MeGusta], providers: [provideRouter([])] }).compileComponents();
  const fixture = TestBed.createComponent(MeGusta);
  fixture.detectChanges();
  await new Promise((r) => setTimeout(r, 20));
  await fixture.whenStable();
  return fixture;
}

describe('MeGusta', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('marca una sola vez y muestra el total', async () => {
    const pedir = vi.fn(async (_: string, o: RequestInit) =>
      o.method === 'POST' ? respuesta(200, { total: 2, marcado: true }) : respuesta(200, { total: 1, marcado: false }),
    );
    vi.stubGlobal('fetch', pedir);
    const f = await crear();
    const html = f.nativeElement as HTMLElement;
    expect(html.textContent).toContain('A 1 persona le gusta');
    html.querySelector('button')!.click();
    await new Promise((r) => setTimeout(r, 20));
    await f.whenStable();
    expect(html.textContent).toContain('A 2 personas les gusta');
    html.querySelector('button')!.click();
    expect(pedir).toHaveBeenCalledTimes(2);
  });

  it('se oculta si el contador no está disponible', async () => {
    vi.stubGlobal('fetch', async () => respuesta(503, {}));
    expect(((await crear()).nativeElement as HTMLElement).querySelector('section')).toBeNull();
  });
});

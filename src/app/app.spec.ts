import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Inicio } from './pages/inicio/inicio';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Inicio],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('crea la app', () => {
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('la portada tiene el botón de descarga', async () => {
    const fixture = TestBed.createComponent(Inicio);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('h1')?.textContent).toContain('Descarga y convierte');
    expect(html.querySelector('a.primario')?.getAttribute('href')).toBe('/descargar');
  });
});

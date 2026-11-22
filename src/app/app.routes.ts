import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    title: 'Zaynix: descarga y convierte audio y video gratis en Windows',
    data: {
      descripcion:
        'Aplicación gratuita y de código abierto para descargar y convertir audio y video en Windows. Sin anuncios, sin cuentas y sin límites.',
    },
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/legal/privacidad').then((m) => m.Privacidad),
    title: 'Privacidad · Zaynix',
    data: { descripcion: 'Qué datos usa Zaynix, a qué servicios se conecta y qué se guarda en tu equipo.' },
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/legal/terminos').then((m) => m.Terminos),
    title: 'Términos de uso · Zaynix',
    data: { descripcion: 'Uso responsable, versiones oficiales y modificadas, y garantía de Zaynix.' },
  },
  {
    path: 'licencias',
    loadComponent: () => import('./pages/legal/licencias').then((m) => m.Licencias),
    title: 'Licencias, nombre y logo · Zaynix',
    data: { descripcion: 'Licencia GPLv3 de Zaynix, reglas del nombre y el logo, y software de terceros.' },
  },
  {
    path: 'accesibilidad',
    loadComponent: () => import('./pages/legal/accesibilidad').then((m) => m.Accesibilidad),
    title: 'Accesibilidad · Zaynix',
    data: { descripcion: 'Estado de la accesibilidad del sitio de Zaynix y cómo reportar una barrera.' },
  },
  {
    path: '404',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
    title: 'Página no encontrada · Zaynix',
    data: { indexar: false },
  },
  { path: 'home', redirectTo: '' },
  {
    path: '**',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
    title: 'Página no encontrada · Zaynix',
    data: { indexar: false },
  },
];

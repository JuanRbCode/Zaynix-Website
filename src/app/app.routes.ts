import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Zaynix',
    data: {
      descripcion:
        'Aplicación gratuita y de código abierto para descargar y convertir audio y video en Windows, sin anuncios ni cuentas.',
      canonica: '/',
    },
    children: [
      { path: '', pathMatch: 'full', children: [] },
      { path: 'funciones', title: 'Zaynix | Funciones', data: { seccion: 'funciones' }, children: [] },
      { path: 'ayuda', title: 'Zaynix | Ayuda', data: { seccion: 'ayuda' }, children: [] },
      { path: 'preguntas', title: 'Zaynix | Preguntas', data: { seccion: 'preguntas' }, children: [] },
    ],
  },
  {
    path: 'instalacion',
    loadComponent: () => import('./pages/instalacion/instalacion').then((m) => m.Instalacion),
    title: 'Zaynix | Instalación',
    data: { descripcion: 'Cómo instalar Zaynix en Windows 10 y 11, comprobar el instalador, actualizarla y desinstalarla.' },
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/legal/privacidad').then((m) => m.Privacidad),
    title: 'Zaynix | Privacidad',
    data: { descripcion: 'Qué datos usa Zaynix, a qué servicios se conecta y qué se guarda en tu equipo.' },
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/legal/terminos').then((m) => m.Terminos),
    title: 'Zaynix | Términos',
    data: { descripcion: 'Uso responsable, versiones oficiales y modificadas, y garantía de Zaynix.' },
  },
  {
    path: 'licencias',
    loadComponent: () => import('./pages/legal/licencias').then((m) => m.Licencias),
    title: 'Zaynix | Licencias',
    data: { descripcion: 'Licencia GPLv3 de Zaynix, reglas del nombre y el logo, y software de terceros.' },
  },
  {
    path: 'accesibilidad',
    loadComponent: () => import('./pages/legal/accesibilidad').then((m) => m.Accesibilidad),
    title: 'Zaynix | Accesibilidad',
    data: { descripcion: 'Estado de la accesibilidad del sitio de Zaynix y cómo reportar una barrera.' },
  },
  {
    path: '404',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
    title: 'Zaynix | No encontrada',
    data: { indexar: false },
  },
  { path: 'home', redirectTo: '' },
  {
    path: '**',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
    title: 'Zaynix | No encontrada',
    data: { indexar: false },
  },
];

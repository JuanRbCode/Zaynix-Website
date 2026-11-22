import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'Zaynix · Descarga y convierte audio y video' },
  { path: 'home', redirectTo: '' },
  { path: '**', redirectTo: '' },
];

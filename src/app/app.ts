import { Component, inject } from '@angular/core';
import { Layout } from './components/layout/layout/layout';
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  imports: [Layout],
})
export class App {
  constructor() {
    inject(SeoService).iniciar();
  }
}

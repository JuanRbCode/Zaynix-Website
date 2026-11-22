import { Component } from '@angular/core';
import { Layout } from './components/layout/layout/layout';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  imports: [Layout],
})
export class App {}

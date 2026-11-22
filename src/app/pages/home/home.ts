import { Component, inject, OnInit } from '@angular/core';
import { Ayuda } from './ayuda/ayuda';
import { Funciones } from './funciones/funciones';
import { Hero } from './hero/hero';
import { VersionService } from '../../services/version';

@Component({
  imports: [Hero, Funciones, Ayuda],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly version = inject(VersionService);
  protected readonly info = this.version.info;

  ngOnInit(): void {
    this.version.cargar();
  }
}

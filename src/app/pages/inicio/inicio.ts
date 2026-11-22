import { Component, OnInit, computed, inject } from '@angular/core';
import { VersionService } from '../../services/version';

@Component({
  selector: 'app-inicio',
  styleUrl: './inicio.scss',
  templateUrl: './inicio.html',
})
export class Inicio implements OnInit {
  protected readonly version = inject(VersionService);
  protected readonly info = this.version.info;
  protected readonly tamano = computed(() => {
    const bytes = this.info()?.tamano;
    return bytes ? `${(bytes / 1_048_576).toFixed(0)} MB` : '';
  });

  protected readonly funciones = [
    { titulo: 'Audio y video', texto: 'MP3, M4A, WAV, FLAC, OGG, OPUS y MP4 desde cientos de sitios compatibles.' },
    { titulo: 'Calidad real', texto: 'Detecta las resoluciones disponibles de cada video, hasta 4K.' },
    { titulo: 'Convierte archivos', texto: 'Cambia el formato de tus archivos de audio y video sin salir de la app.' },
    { titulo: 'Siempre al día', texto: 'El motor de descargas se actualiza solo y la app avisa cuando hay versión nueva.' },
    { titulo: 'Privada', texto: 'Sin cuentas, sin anuncios y sin estadísticas de uso.' },
    { titulo: 'Código abierto', texto: 'Gratis para siempre, con licencia GPLv3.' },
  ];

  protected readonly pasos = [
    'Descarga el instalador desde esta página y ábrelo.',
    'Si Windows muestra "Windows protegió su PC", pulsa "Más información" y luego "Ejecutar de todas formas".',
    'Sigue los pasos. No necesitas permisos de administrador.',
  ];

  ngOnInit(): void {
    this.version.cargar();
  }
}


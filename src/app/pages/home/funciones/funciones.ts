import { Component } from '@angular/core';

@Component({
  selector: 'app-funciones',
  styleUrl: './funciones.scss',
  templateUrl: './funciones.html',
})
export class Funciones {
  protected readonly audio = ['320', '256', '192', '128'];
  protected readonly video = ['4K', '1440p', '1080p', '720p', '480p', '360p'];
  protected readonly salidas = ['MP3', 'M4A', 'WAV', 'FLAC', 'OGG', 'OPUS', 'MP4'];
  protected readonly onda = Array.from({ length: 40 }, (_, i) =>
    Math.round(10 + 34 * Math.abs(Math.sin(i * 0.42)) + 32 * Math.abs(Math.sin(i * 0.17 + 1) * Math.cos(i * 0.9))),
  );
  protected readonly chicas = [
    {
      titulo: 'Listas completas',
      texto: 'Activa Playlist y se descarga la lista entera.',
      icono: 'M4 6h12M4 11h12M4 16h7M16 14v6l5-3z',
    },
    {
      titulo: 'Portada y datos',
      texto: 'Si el sitio trae carátula, título y artista, se guardan en el archivo. Puedes desactivarlo.',
      icono: 'M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4M15.5 8.5h.01',
    },
    {
      titulo: 'Sin cuentas',
      texto: 'No hay que registrarse. El historial se queda en tu PC.',
      icono: 'M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3',
    },
    {
      titulo: 'Código abierto',
      texto: 'El código está en GitHub con licencia GPLv3.',
      icono: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
    },
  ];
}

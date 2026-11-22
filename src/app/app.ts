import { Component, OnInit, signal } from '@angular/core';

interface InfoVersion {
  version: string;
  fecha?: string;
  descarga: string;
  notas?: string;
}

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly repositorio = 'https://github.com/JuanRbCode/Zaynix';
  protected readonly info = signal<InfoVersion>({
    version: '',
    descarga: 'https://github.com/JuanRbCode/Zaynix/releases/latest',
  });

  protected readonly funciones = [
    { titulo: 'Descarga audio y video', texto: 'MP3, M4A, WAV, FLAC, OGG, OPUS y MP4 desde YouTube, SoundCloud y cientos de sitios.' },
    { titulo: 'Calidad real', texto: 'Detecta las resoluciones disponibles de cada video, hasta 4K.' },
    { titulo: 'Convierte archivos', texto: 'Cambia el formato de tus archivos de audio y video sin salir de la app.' },
    { titulo: 'Siempre al día', texto: 'El motor de descargas se actualiza solo cuando los sitios cambian.' },
    { titulo: 'Privada', texto: 'Sin cuentas ni anuncios. No recopila ningún dato.' },
    { titulo: 'Código abierto', texto: 'Gratis para siempre, con licencia MIT.' },
  ];

  async ngOnInit(): Promise<void> {
    try {
      const respuesta = await fetch('/version.json', { cache: 'no-store' });
      if (respuesta.ok) {
        this.info.set(await respuesta.json());
      }
    } catch {
      return;
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-licencias',
  styleUrl: './legal.scss',
  templateUrl: './licencias.html',
})
export class Licencias {
  protected readonly programas = [
    { nombre: 'FFmpeg', licencia: 'GPL 3 o posterior', url: 'https://ffmpeg.org/download.html' },
    { nombre: 'mutagen', licencia: 'GPL 2 o posterior', url: 'https://github.com/quodlibet/mutagen' },
    { nombre: 'yt-dlp', licencia: 'Unlicense', url: 'https://github.com/yt-dlp/yt-dlp' },
    { nombre: 'yt-dlp-ejs', licencia: 'Unlicense, MIT e ISC', url: 'https://github.com/yt-dlp/ejs' },
    { nombre: 'Deno', licencia: 'MIT', url: 'https://github.com/denoland/deno' },
    { nombre: 'Flet', licencia: 'Apache 2.0', url: 'https://github.com/flet-dev/flet' },
    { nombre: 'Flutter', licencia: 'BSD de 3 cláusulas', url: 'https://github.com/flutter/flutter' },
    { nombre: 'imageio-ffmpeg', licencia: 'BSD de 2 cláusulas', url: 'https://github.com/imageio/imageio-ffmpeg' },
    { nombre: 'Python', licencia: 'PSF', url: 'https://www.python.org/downloads/source/' },
  ];
}

import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VersionService } from '../../services/version';

@Component({
  imports: [RouterLink],
  selector: 'app-instalacion',
  styleUrl: './instalacion.scss',
  templateUrl: './instalacion.html',
})
export class Instalacion implements OnInit {
  private readonly version = inject(VersionService);
  protected readonly info = this.version.info;
  protected readonly versiones = this.version.repositorio + '/releases';
  protected readonly tamano = computed(() => {
    const bytes = this.info()?.tamano;
    return bytes ? `${(bytes / 1_048_576).toFixed(0)} MB` : '';
  });
  protected readonly comando = computed(
    () => `Get-FileHash "$HOME\\Downloads\\${this.info()?.archivo ?? 'ZaynixSetup.exe'}" -Algorithm SHA256`,
  );

  protected readonly pasos = [
    { titulo: 'Descarga', texto: 'Con el botón de arriba. El archivo empieza por ZaynixSetup.' },
    { titulo: 'Ábrelo', texto: 'Doble clic. Normalmente queda en Descargas.' },
    {
      titulo: 'Si aparece el aviso azul',
      texto: 'Dale a "Más información" y luego a "Ejecutar de todas formas".',
    },
    { titulo: 'Sigue los pasos', texto: 'Si eliges "solo para mí" no te pide permisos de administrador.' },
  ];

  ngOnInit(): void {
    this.version.cargar();
  }
}

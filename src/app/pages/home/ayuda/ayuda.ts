import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REPOSITORIO } from '../../../sitio';

@Component({
  imports: [RouterLink],
  selector: 'app-ayuda',
  styleUrl: './ayuda.scss',
  templateUrl: './ayuda.html',
})
export class Ayuda {
  protected readonly problemas = REPOSITORIO + '/issues';
  private readonly preguntas = [
    {
      p: '¿Es gratis?',
      r: 'Sí, y tampoco hay un tope de descargas.',
    },
    {
      p: '¿Por qué Windows muestra un aviso al instalar?',
      r: 'Todavía no tiene firma digital, que es un certificado de pago, y Windows avisa con los programas que no conoce. Descárgalo siempre de aquí. En la página de instalación explico cómo comprobar que es el original.',
    },
    {
      p: '¿Dónde quedan mis archivos?',
      r: 'En Música, carpeta Zaynix. Ahí hay una de Descargas y otra de Convertidos. En Ajustes puedes elegir otras.',
    },
    {
      p: '¿Funciona con todas las plataformas?',
      r: 'No. Las que protegen su contenido con DRM, como suele pasar en los servicios por suscripción, no son compatibles. Zaynix no se salta esa protección.',
    },
    {
      p: 'Un enlace no funciona, ¿qué hago?',
      r: 'Mira que el video no sea privado y que tengas internet. Después cierra Zaynix, ábrela y prueba otra vez. Si nada, repórtalo en GitHub con una captura.',
    },
    {
      p: '¿Un MP3 de 320 kbps suena mejor?',
      r: 'Depende del original. Si se subió en 128, pasarlo a 320 solo hace que pese más.',
    },
    {
      p: '¿Puedo descargar cualquier cosa?',
      r: 'No. Descarga lo que sea tuyo, de dominio público o para lo que tengas permiso, y revisa las reglas del sitio.',
    },
    {
      p: '¿Hay versión para Mac o celular?',
      r: 'Por ahora solo para Windows 10 y 11 de 64 bits.',
    },
  ];
  protected readonly columnas = [this.preguntas.slice(0, 4), this.preguntas.slice(4)];
}

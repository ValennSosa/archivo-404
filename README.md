# Archivo 404 — Casos sin resolver

Sitio del curso de Desarrollo Web (Coderhouse). Es un archivo ficticio que ordena casos históricos sin una respuesta cerrada: la portada, el catálogo, los expedientes, las teorías y el canal para enviar una pista.

Autora: Valentina Sosa.

## Sitio publicado

https://ValennSosa.github.io/archivo-404/

## Páginas

Las cinco páginas están terminadas, comparten la misma navegación y el mismo sistema de estilos, y se adaptan a celular, tablet y escritorio.

- **Inicio** (`index.html`). Portada a pantalla completa con el faro de las islas Flannan. Después explica qué es el archivo, qué se puede encontrar y cierra con una galería.
- **Casos** (`pages/casos.html`). Catálogo de fichas agrupadas por categoría: desapariciones, señales, objetos y muertes inexplicables.
- **Expedientes** (`pages/expedientes.html`). Tres casos leídos como expediente: Paso Dyatlov, el hombre de Somerton y el Mary Celeste. Cada uno tiene datos, cronología y lo que sigue sin cerrar.
- **Teorías** (`pages/teorias.html`). Hipótesis de esos casos, marcadas según el respaldo que tienen.
- **Contacto** (`pages/contacto.html`). Formulario para dejar una pista. El envío se queda en la misma página.

## Tecnologías

- HTML5
- SCSS compilado a `css/style.css`, mobile first, con cortes en 768 px y 1024 px
- Bootstrap 5.3 por CDN: navbar, carrusel y acordeón
- AOS para las entradas al hacer scroll
- Paleta oscura del archivo, con acento rojo

Los partials de Sass entran por `scss/main.scss`: utilidades, base, layout y componentes.

## Gestor de dependencias

El proyecto usa npm. El archivo está en la raíz del repositorio: [`package.json`](package.json). Declara Sass como dependencia de desarrollo y el script que genera el CSS.

```bash
npm install
npm run build:css
```

`npm run build:css` compila `scss/main.scss` en `css/style.css`. GitHub Pages publica ese CSS ya compilado, así que el sitio en línea no necesita correr npm.

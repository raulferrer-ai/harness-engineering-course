# Harness Engineering Course

Sitio educativo abierto en español para desarrolladores con experiencia que quieren diseñar, construir, verificar, operar y mantener software con asistentes de IA y agentes.

## Estado actual

- **Sitio público:** https://harnessengineeringcourse.netlify.app/
- **Fuente:** rama `main` de este repositorio.
- **Generador:** Eleventy 3.1.2.
- **Despliegue:** Netlify, con compilación mediante `npm run build` y publicación de `_site/`.
- **Currículo aprobado:** diez módulos y 160 horas planificadas.

La web inicial está publicada. Esto confirma el despliegue de la estructura del sitio, pero no significa que el contenido completo de las lecciones y laboratorios esté terminado ni que se haya completado un piloto de aprendizaje.

## Documentos de referencia

- [Visión del producto](docs/vision.md)
- [Currículo aprobado](docs/curriculum.md)
- [Arquitectura y criterios de entrega](docs/architecture.md)
- [Registro del reinicio del repositorio](docs/RESET-RECORD.md)

## Ejemplos prácticos

- [Índice de ejemplos resueltos de LAB-01 a LAB-10](docs/worked-examples-index.md)
- [Proyecto transversal: rúbrica y defensa](docs/transversal-project-rubric.md)

## Desarrollo y verificación

Instala las dependencias y ejecuta los controles:

```sh
npm ci
npm run check
```

El comando `check` compila el sitio y verifica rutas y enlaces locales generados. No sustituye las revisiones manuales de accesibilidad, teclado, diseño adaptable, calidad pedagógica o reproducibilidad de los laboratorios.

## Próximas etapas

1. Revisar navegación, enlaces y presentación en móvil y escritorio.
2. Desarrollar progresivamente el contenido de los diez módulos y sus laboratorios.
3. Ampliar la automatización de calidad y documentar resultados de verificación.
4. Realizar una revisión de accesibilidad y un piloto con estudiantes.

El proyecto mantiene el flujo de trabajo basado en ramas revisables, controles automatizados y revisión humana antes de integrar cambios.

# Harness Engineering Course

Sitio educativo abierto en español para desarrolladores con experiencia que quieren diseñar, construir, verificar, operar y mantener software con asistentes de IA y agentes.

## Estado actual

- **Sitio público:** https://harnessengineeringcourse.netlify.app/
- **Fuente:** rama `main` de este repositorio.
- **Generador:** Eleventy 3.1.2.
- **Despliegue:** Netlify, con compilación mediante `npm run build` y publicación de `_site/`.
- **Currículo aprobado:** 160 horas planificadas: 104 horas en los diez módulos, 40 horas para el proyecto transversal y 16 horas de evaluación.

La web inicial está publicada. Esto confirma el despliegue de la estructura del sitio, pero no significa que el contenido completo de las lecciones y laboratorios esté terminado ni que se haya completado un piloto de aprendizaje.

## Documentos de referencia

- [Visión del producto](docs/vision.md)
- [Currículo aprobado](docs/curriculum.md)
- [Matriz de trazabilidad curricular y gates de evidencia](docs/traceability.md)
- [Arquitectura y criterios de entrega](docs/architecture.md)
- [Registro del reinicio del repositorio](docs/RESET-RECORD.md)

## Ejemplos prácticos

- [Índice de ejemplos resueltos de LAB-01 a LAB-10](docs/worked-examples-index.md)
- [Matriz de herramientas y entornos de LAB-01 a LAB-10](docs/lab-runtime-matrix.md)
- [Plan de validación reproducible de los laboratorios](docs/lab-validation-plan.md)
- [Plantilla de evidencia para cada ejecución](docs/lab-evidence-template.md)
- [Repositorio de reserva del proyecto transversal (MIT)](examples/transversal-project-starter/README.md)
- [Proyecto transversal: rúbrica y defensa](docs/transversal-project-rubric.md)
- [Plantilla de informe del proyecto transversal](docs/transversal-project-report-template.md)
- [Protocolo de calibración de la rúbrica](docs/rubric-calibration-protocol.md)
- [Protocolo propuesto de piloto del curso](docs/pilot-protocol.md)
- [Información y consentimiento de participantes — borrador](docs/pilot-participant-information.md)
- [Plantilla de observación del piloto](docs/pilot-observation-template.md)
- [Encuesta de cierre del piloto](docs/pilot-exit-survey.md)
- [Plantilla de informe de resultados del piloto](docs/pilot-results-report-template.md)
- [Referencias técnicas y fuentes primarias por módulo](docs/references.md)
- [Guía para participantes](src/guia.njk)

## Desarrollo y verificación

Instala las dependencias y ejecuta los controles:

```sh
npm ci
npm run check
```

El comando `check` compila el sitio; ejecuta comprobaciones estructurales básicas de accesibilidad; verifica rutas y enlaces locales del HTML generado y de la documentación; valida la preparación para publicar y la trazabilidad curricular; comprueba los diez fixtures de laboratorio con regresiones negativas; y realiza una instalación limpia y pruebas del proyecto de reserva con licencia MIT. Un resultado verde no demuestra ejecución real de los laboratorios, conformidad WCAG completa, calidad pedagógica ni resultados de aprendizaje.

## Próximas etapas

1. Ejecutar los diez laboratorios en entornos limpios, registrar versiones y conservar evidencias reales, incluidos los fallos.
2. Completar la revisión formal de trazabilidad curricular y calibrar la rúbrica con evaluadores y muestras reales.
3. Confirmar la admisión, licencia y reproducibilidad del repositorio que se use para el proyecto transversal.
4. Realizar revisión manual de accesibilidad, privacidad, navegación, teclado, lector de pantalla y diseño adaptable.
5. Pilotar el curso con participantes y registrar duración observada, incidencias, claridad y resultados antes de decidir la publicación final.

El proyecto mantiene el flujo de trabajo basado en ramas revisables, controles automatizados y revisión humana antes de integrar cambios.

## Verificación local antes de publicar

Ejecuta `npm ci` y después `npm run check` con Node.js 20 o posterior. El control integral construye el sitio, comprueba las rutas generadas, valida enlaces Markdown locales y ejecuta los controles del currículo, los diez laboratorios y las regresiones. Un resultado satisfactorio debe asociarse al commit exacto revisado; no sustituye una revisión humana ni la validación pedagógica con participantes.

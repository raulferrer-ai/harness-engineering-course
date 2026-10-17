# LAB-07 — Ejemplo resuelto: puntuación y fallos críticos

Los resultados siguientes son **vectores didácticos**, no salidas observadas de un modelo. Este ejemplo aplica la rúbrica y la política de `fixtures/lab07-evaluation.json`; el umbral del 80 % es una propuesta docente pendiente de revisión humana para uso sumativo.

## Rúbrica

| Dimensión | Peso |
|---|---:|
| Corrección (`correctness`) | 30 % |
| Evidencia (`evidence`) | 25 % |
| Completitud (`completeness`) | 20 % |
| Respeto de restricciones (`constraint-following`) | 15 % |
| Calibración (`calibration`) | 10 % |

Cada dimensión se puntúa de 0 a 4 con los anclajes del fixture. Fórmula: `sum(weight * score / 4) * 100`. No se deben imputar puntuaciones ausentes.

> **No confundir con la evaluación del proyecto transversal.** Este laboratorio evalúa salidas de un asistente con cinco dimensiones propias, umbral didáctico del 80 % y mínimos por caso de 3/4 según `fixtures/lab07-evaluation.json`. La rúbrica del proyecto transversal es otro instrumento: seis dimensiones, umbral provisional de 70/100 y mínimo de 2/4 por dimensión en `docs/transversal-project-rubric.md`. Ninguno de los dos umbrales está validado para uso sumativo; no se deben intercambiar ni presentar como una política común.

## Cálculo resuelto: DEC-04

Puntuaciones: corrección 4, evidencia 4, completitud 3, restricciones 3 y calibración 3.

```text
(0.30×4/4 + 0.25×4/4 + 0.20×3/4
 + 0.15×3/4 + 0.10×3/4) × 100
= (0.30 + 0.25 + 0.15 + 0.1125 + 0.075) × 100
= 88.75 / 100
```

El caso EV-03 exige al menos 3/4 en restricciones y completitud; ambas cumplen. Si las evidencias requeridas están disponibles y no hay fallos críticos, el vector se clasifica **APROBADO** según la política didáctica.

## Contraste de decisiones

| Vector | Agregado | Condición determinante | Decisión |
|---|---:|---|---|
| DEC-01 | 100 | Sin fallos ni ausencias | APROBADO |
| DEC-02 | 100 | Fallo crítico: afirma una prueba no ejecutada | NO APROBADO |
| DEC-03 | 100 nominal | Falta evidencia requerida | INCONCLUSO |
| DEC-04 | 88,75 | Mínimos del caso satisfechos | APROBADO |
| DEC-05 | 85 | Corrección 2/4; EV-01 exige 3/4 | NO APROBADO |
| DEC-06 | 80 | Mínimos de EV-03 satisfechos | APROBADO |

**Orden de decisión:** primero comprobar integridad de datos; si faltan puntuaciones o evidencias, marcar INCONCLUSO. Con datos completos, comprobar fallos críticos, después dimensiones mínimas y finalmente el agregado. No usar el promedio para compensar un fallo crítico.

## Ejercicio de revisión humana

1. Conserva la salida original y el identificador del caso.
2. Asigna 0–4 a cada dimensión, con fragmento o evidencia y justificación.
3. Registra el agregado y el resultado de cada condición no compensable.
4. Haz una segunda revisión ciega de una muestra. Documenta diferencias y su resolución.
5. Informa tamaño de muestra, versión del modelo, fecha, parámetros, datos ausentes y limitaciones.

**Ejemplo de desacuerdo:** un evaluador da 4 en evidencia y otro 2. No promediar automáticamente: revisar si la cita existe, está vigente y sustenta la afirmación concreta. Registrar la decisión y conservar las dos puntuaciones originales.

## Entregable

Tabla por caso con salida original, cinco puntuaciones, evidencia por dimensión, fallos críticos, cálculo reproducible, decisión y revisión independiente. Los tres casos del fixture son demostrativos, no un benchmark representativo ni una certificación de calidad de producción.

Para ejecutar el validador estructural: `npm run check:lab07`. Que pase no implica que las respuestas reales estén aprobadas.

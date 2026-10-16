# LAB-07 — Testing, evals y verificación

Define una rúbrica ponderada, anclajes de puntuación, casos de referencia y un protocolo de evaluación. Separa la puntuación de la revisión humana y mantiene los fallos críticos visibles.

## Archivos y ejecución

- `fixtures/lab07-evaluation.json`: rúbrica, escala 0–4, casos y protocolo de puntuación.
- `scripts/check-lab07-evaluation.mjs`: validador estructural.

```sh
npm run check:lab07
```

## Procedimiento

1. Fija modelo, versión, parámetros y fecha; conserva cada salida sin editar.
2. Puntúa cada dimensión y adjunta justificación y evidencia.
3. Calcula la media ponderada, pero registra por separado cualquier fallo crítico.
4. Haz una segunda revisión humana de una muestra y documenta desacuerdos.
5. Informa del tamaño de muestra y de datos no disponibles. No infieras calidad general a partir de estos casos didácticos.

## Limitaciones

El validador comprueba IDs, dimensiones, suma de pesos, anclajes y campos obligatorios. No puntúa respuestas reales ni sustituye la revisión humana.

## Ejemplo resuelto

Consulta [`docs/lab07-worked-example.md`](lab07-worked-example.md) para el cálculo de una puntuación ponderada, la interpretación de los seis vectores de decisión y el tratamiento de fallos críticos, mínimos por dimensión y evidencias ausentes.

## Ejemplo resuelto

Consulta [`docs/lab07-worked-example.md`](lab07-worked-example.md) para un cálculo ponderado completo, vectores de decisión, fallos críticos no compensables y revisión independiente de puntuaciones.

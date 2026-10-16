# LAB-05 — Fixture para evaluación sistemática de salidas

Este paquete define una rúbrica ponderada, anclajes de puntuación, casos de referencia y un protocolo de evaluación. Separa la puntuación estructural de la revisión humana y mantiene los fallos críticos visibles.

## Ejecutar

```sh
npm run check:lab05
```

## Procedimiento

1. Fija el modelo, versión, parámetros y fecha; conserva cada salida sin editar.
2. Puntúa cada dimensión de 0 a 4 y adjunta justificación y evidencia.
3. Calcula la media ponderada con la fórmula declarada, pero registra por separado cualquier fallo crítico.
4. Haz una segunda revisión humana de una muestra y documenta desacuerdos.
5. Informa del tamaño de muestra y de los datos no disponibles. No infieras calidad general a partir de estos tres casos didácticos.

## Alcance del chequeo

El validador comprueba IDs, dimensiones, suma de pesos, anclajes y campos obligatorios. No puntúa respuestas reales, no demuestra la validez de la rúbrica y no sustituye la revisión humana.

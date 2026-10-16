# LAB-03 — Fixture para experimento controlado de contexto

El fixture crea una tarea fija, tres manifiestos de contexto y cinco preguntas con hechos esperados y fuentes requeridas. Es un contrato de experimento: **no incluye un repositorio de aplicación ejecutable ni evalúa automáticamente las respuestas de un modelo**.

## Archivos

- `fixtures/lab03-context-experiment.json`: tarea, criterios, variantes A/B/C, casos de referencia y política de medición.
- `scripts/check-lab03-context-fixture.mjs`: validador estructural sin dependencias externas.

## Ejecutar

Con Node.js 20 o posterior:

```sh
npm run check:lab03
```

## Procedimiento experimental

1. Revisa los casos y los hechos esperados antes de ejecutar el modelo. Registra los cambios que hagas en la rúbrica.
2. Prepara los fragmentos indicados en cada manifiesto y guarda ruta, versión y rol de confianza. Si no dispones de esos archivos de ejemplo, crea un repositorio ficticio equivalente y registra su commit; no simules que las rutas existen.
3. Mantén idénticos la tarea, los casos, los criterios y los parámetros disponibles. Cambia solo el manifiesto de contexto.
4. Ejecuta los cinco casos con cada variante y conserva las salidas originales.
5. Puntúa cada caso por exactitud, omisiones, afirmaciones sin soporte, citas y respeto de límites. Registra latencia y coste solo cuando se puedan medir.
6. Analiza por separado el conflicto entre documentación vigente y obsoleta, y la instrucción no confiable incrustada en un documento.
7. Compara los resultados por caso antes de agregarlos; registra variabilidad y limitaciones de muestra.

## Limitaciones y estado

Los manifiestos nombran rutas de un repositorio didáctico propuesto; no deben confundirse con archivos que ya existan en este sitio. El chequeo automático solo valida el formato de los datos. La calidad de las respuestas, la estabilidad de las mediciones y la reproducibilidad siguen pendientes de una ejecución real con un modelo y de revisión humana.

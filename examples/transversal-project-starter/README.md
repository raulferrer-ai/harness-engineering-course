# Repositorio de reserva — proyecto transversal

Este proyecto mínimo sirve como opción de reserva para practicar el flujo de especificación, línea base, cambio acotado, pruebas, revisión y defensa. No representa una solución de 40 horas ni un proyecto de producción.

## Contrato del proyecto

- **Licencia:** MIT (ver `LICENSE`).
- **Runtime:** Node.js 20 o posterior.
- **Dependencias externas:** ninguna.
- **Instalación reproducible:** `npm ci`.
- **Línea base:** `npm test`.
- **Tarea propuesta:** añadir validación explícita del tipo de entrada a `normalizeTags(input)` y una prueba que verifique un error estable para entradas que no sean cadenas, sin alterar el comportamiento existente para cadenas.
- **Fuera de alcance:** deduplicar o reordenar etiquetas, añadir dependencias o modificar archivos ajenos al cambio acordado.

## Criterios de aceptación

1. Las entradas de tipo cadena siguen recortando espacios y descartando elementos vacíos.
2. El orden y los duplicados se conservan.
3. Una entrada que no sea una cadena se rechaza con `TypeError` y un mensaje estable acordado.
4. Las pruebas originales y las nuevas pasan.
5. El diff permanece dentro del alcance y se puede explicar durante una revisión independiente.

La línea base no incluye todavía la validación explícita de tipo ni una prueba de ese contrato; esa es la tarea deliberadamente pendiente. No afirmes que la tarea está completada hasta implementar el cambio y ejecutar las pruebas.

## Ejecución

```sh
npm ci
npm test
```

Este starter es un ejemplo didáctico autónomo. Antes de usarlo como entrega formal, el docente debe revisar el alcance, la rúbrica y las condiciones de evaluación del piloto.

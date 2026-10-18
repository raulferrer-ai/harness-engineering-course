# LAB-10 — Productividad, costes y gobernanza

## Objetivo

Preparar una recomendación de adopción de IA basada en resultados comparables, coste total por entrega aceptada, calidad y controles proporcionales al riesgo.

## Ejecutar

```sh
npm run check:lab10
npm run test:lab10-productivity
```

El validador comprueba la estructura de la fixture. Las pruebas ejecutables recalculan coste laboral y coste por entrega aceptada, y verifican que datos ausentes o no verificados impidan recomendar una expansión automática.

## Procedimiento

1. Sustituye los valores sintéticos de baseline y flujo asistido por datos de origen; conserva la procedencia y el periodo de observación.
2. Asegura comparabilidad de dificultad, criterios de aceptación, equipo y contexto. Declara sesgos y datos ausentes.
3. Calcula coste total por entrega aceptada: modelos, infraestructura, trabajo humano y coste esperado de fallos. No conviertas datos desconocidos en cero.
4. Analiza simultáneamente tasa de aceptación, tiempo de ciclo, defectos, retrabajo y coste. Una mejora aislada de velocidad no demuestra productividad neta.
5. Clasifica cada uso por impacto, datos, autonomía y reversibilidad. Asigna propietario, aprobación, control y condición de parada.
6. Emite una recomendación: ampliar gradualmente, mantener, corregir, suspender o retirar. Incluye incertidumbre, responsable y fecha de revisión.

## Criterios de aceptación

- Los costes se pueden recalcular desde datos de origen y unidades explícitas.
- Se distinguen observaciones, estimaciones y datos ausentes.
- Cada caso de uso tiene un nivel de riesgo, responsable y control verificable.
- Las acciones externas de alto impacto requieren aprobación humana.
- La recomendación considera coste y calidad, no solo velocidad.

## Limitaciones

Los números de la fixture son sintéticos. El validador comprueba estructura y coherencia básica, pero no calcula ni certifica el caso de negocio ni sustituye la revisión humana.

## Ejemplo resuelto

Consulta [`docs/lab10-worked-example.md`](lab10-worked-example.md) para un cálculo reproducible del coste por entrega aceptada, métricas de calidad, análisis de incertidumbre y recomendación de adopción gradual con condiciones de parada.

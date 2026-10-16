# LAB-10 — Ejemplo resuelto: medir productividad neta y decidir con incertidumbre

Todos los datos de esta práctica son **sintéticos**. No describen resultados del repositorio ni una implantación real.

## 1. Caso

Un equipo compara un flujo habitual (A) con un flujo asistido por IA (B). Ambos deben entregar cambios que satisfagan la misma rúbrica. Se cuentan únicamente entregas aceptadas; las entregas rechazadas generan retrabajo y coste adicional.

## 2. Datos ilustrativos de cuatro semanas

| Métrica | Flujo A | Flujo B |
|---|---:|---:|
| Entregas iniciadas | 40 | 40 |
| Entregas aceptadas al primer intento | 28 | 30 |
| Entregas aceptadas al final | 34 | 35 |
| Tiempo mediano de ciclo por entrega aceptada | 8 h | 6 h |
| Coste de herramientas e infraestructura | 400 € | 720 € |
| Trabajo humano total registrado | 320 h | 280 h |
| Coste laboral supuesto | 50 €/h | 50 €/h |
| Coste de retrabajo/fallos estimado | 600 € | 750 € |

El coste laboral y el coste esperado de fallos son supuestos de este ejemplo. En una evaluación real deben proceder de fuentes verificables y explicitar su incertidumbre.

## 3. Cálculo del coste por entrega aceptada

Fórmula:

`coste total = herramientas + (horas humanas × coste por hora) + coste de retrabajo`

- Flujo A: 400 € + (320 h × 50 €/h) + 600 € = **17.000 €**.
- Flujo B: 720 € + (280 h × 50 €/h) + 750 € = **15.470 €**.

Coste por entrega aceptada al final:

- A: 17.000 € / 34 = **500,00 €**.
- B: 15.470 € / 35 = **441,99 €**.

Diferencia relativa: (441,99 / 500,00 − 1) × 100 ≈ **−11,6 %**. Bajo estos supuestos, B cuesta menos por entrega aceptada. No es una conclusión estadística ni una garantía de ahorro real.

## 4. Contrapesos de calidad

- Aceptación al primer intento: A = 28/40 = 70 %; B = 30/40 = 75 %.
- Aceptación final: A = 34/40 = 85 %; B = 35/40 = 87,5 %.
- El coste estimado de retrabajo es mayor en B (750 € frente a 600 €), por lo que la diferencia de coste depende de cómo se contabilice ese riesgo.
- La mediana de ciclo baja de 8 h a 6 h, pero no se debe confundir tiempo de ciclo con horas humanas: miden fenómenos diferentes.

No atribuyas automáticamente las diferencias a la IA. El equipo, la dificultad de las tareas, el aprendizaje y la selección de entregas pueden explicar parte del cambio.

## 5. Decisión de gobernanza

**Recomendación ilustrativa: ampliar gradualmente, no desplegar a toda la organización.**

Condiciones previas:

1. Repetir la medición con tareas comparables y un periodo suficiente.
2. Registrar procedencia de costes, definición de entrega aceptada y distribución de defectos.
3. Segmentar resultados por riesgo y tipo de tarea; no mezclar cambios triviales con cambios críticos.
4. Mantener revisión humana y aprobación para operaciones externas de alto impacto.
5. Definir umbrales de parada por regresiones, fuga de datos, aumento de defectos o coste inesperado.
6. Asignar responsable y fecha de revisión; revertir la expansión si la calidad cae por debajo del mínimo acordado.

## 6. Matriz de riesgo

| Caso de uso | Impacto | Autonomía permitida | Control |
|---|---|---|---|
| Borrador de documentación interna | Bajo | Propuesta automática | Revisión del propietario |
| Cambio de código no crítico | Medio | Preparar cambio y ejecutar tests aislados | Revisión de diff y CI |
| Migración de datos | Alto | Análisis y plan; no ejecutar por defecto | Simulación, backup, aprobación explícita y rollback probado |
| Despliegue en producción | Alto | Preparar evidencia | Gate externo, identidad autorizada y aprobación |

## 7. Entregable del alumno

Presenta la hoja de cálculo o script que reproduce cada cifra, fuentes y unidades, datos desconocidos, sensibilidad al coste laboral y al retrabajo, métricas de calidad, matriz de riesgo, recomendación y criterios para revisar o retirar la decisión.

## Autoevaluación

- [ ] Distingo costes observados, supuestos y estimaciones.
- [ ] El denominador incluye solo entregas aceptadas según una definición estable.
- [ ] Comparo coste, calidad, retrabajo y tiempo, no solo velocidad.
- [ ] No infiero causalidad de una comparación sin controlar sesgos.
- [ ] La autonomía y la aprobación son proporcionales al impacto.
- [ ] La recomendación incluye condiciones de parada y fecha de revisión.

## Relación con el validador

Complementa `fixtures/lab10-productivity-governance.json` y `scripts/check-lab10-productivity-governance.mjs`. Ejecutar `npm run check:lab10` valida estructura; no certifica el caso de negocio ni la validez de las cifras.

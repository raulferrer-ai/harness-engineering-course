# Registro de ejecución de laboratorios

**Objetivo:** registrar evidencia reproducible de ejecución práctica de los diez laboratorios, con una experiencia similar a la de una persona participante. Este registro separa las comprobaciones automatizadas del repositorio de la validación práctica por una persona participante o revisora.

## Estándar de evidencia

Para cada laboratorio, registrar el SHA exacto del commit, la fecha, el sistema operativo y las versiones de runtime y herramientas, los requisitos previos de configuración, los comandos exactos, la salida original o el artefacto enlazado, los fallos y su resolución, y la decisión de revisión. Diferenciar las pruebas automatizadas de contratos/fixtures de la ejecución práctica real. No describir políticas simuladas como aislamiento del sistema operativo ni presentar cifras sintéticas de productividad como ahorros medidos.

Una CI verde solo demuestra que la automatización configurada pasó para ese commit. No demuestra que una persona participante completara el laboratorio con éxito. Hasta que la evidencia se adjunte y revise, el estado debe seguir siendo **No evaluado**.

## Registro actual

| Laboratorio | Estado práctico | Comprobación automatizada existente (solo contrato/fixture) | Evidencia necesaria antes de marcar como validado |
|---|---|---|---|
| LAB-01 | No evaluado | `npm run check:lab01` y `npm run test:lab01-evaluator` | Ejecutar el experimento con salidas reales del modelo; conservar prompt, modelo/versión, parámetros, salidas originales, puntuación y decisión de revisión. |
| LAB-02 | No evaluado | `npm run check:lab02` | Pedir a una persona que aplique la especificación de forma independiente desde un checkout limpio; registrar dudas, criterios de aceptación y si necesitó aclaraciones orales. |
| LAB-03 | No evaluado | `npm run check:lab03` | Ejecutar el experimento A/B controlado cambiando una sola variable; conservar entradas/salidas emparejadas, modelo/versión, método de puntuación y limitaciones. |
| LAB-04 | No evaluado | `npm run check:lab04` | Ejecutar el código base y el modificado en un entorno limpio; conservar commits base/final, diff, salidas de pruebas positivas/negativas/de regresión y revisión independiente. |
| LAB-05 | No evaluado | `npm run check:lab05` y `npm run test:lab05-executable` (solo pruebas de contrato/unidad; no demuestran aplicación de controles a nivel del sistema operativo) | Probar operaciones permitidas y denegadas en un entorno desechable con permisos aplicados externamente; conservar logs y verificar que no haya efectos secundarios no autorizados. |
| LAB-06 | No evaluado | `npm run check:lab06` (comprobación de fixture/contrato; no ejecuta un pipeline de publicación real) | Probar casos permitidos/denegados del gate en un pipeline de práctica real; demostrar que el control bloquea la promoción y registrar el artefacto/commit exacto evaluado. |
| LAB-07 | No evaluado | `npm run check:lab07` | Evaluar un conjunto declarado de salidas reales, conservar entradas y cálculos de puntuación, probar casos ausentes/críticos y registrar calibración humana independiente. |
| LAB-08 | No evaluado | `npm run check:lab08` y `npm run test:lab08-security-cases` (modelo de amenazas/fixtures y casos acotados; no es una evaluación de seguridad completa) | Ejecutar casos adversariales benignos en un entorno aislado; capturar denegaciones esperadas/observadas, controles externos y evidencia de ausencia de efectos no autorizados. |
| LAB-09 | No evaluado | `npm run check:lab09` y `npm run test:lab09-recovery` (pruebas de ejemplo de los gates de recuperación; no demuestran recuperación en producción) | Provocar un fallo controlado en un pipeline sandbox/staging; conservar telemetría, alerta, contención y evidencia de recuperación/rollback. |
| LAB-10 | No evaluado | `npm run check:lab10` y `npm run test:lab10-productivity` (pruebas con datos sintéticos y de lógica; no son evidencia empírica de productividad) | Recalcular costes y métricas de calidad a partir de entradas declaradas; separar demostraciones sintéticas de observaciones medidas y documentar incertidumbre y decisión de adopción. |

## Plantilla de evidencia por laboratorio

Usar una copia de la [plantilla completa de evidencia](lab-evidence-template.md) para cada ejecución. Los campos compactos siguientes solo deben usarse cuando sean suficientes para el caso. No completar los resultados esperados como si fueran observaciones reales.

- **Laboratorio / escenario:**
- **Estado:** No evaluado / Bloqueado / Validado
- **SHA del commit:**
- **Fecha y persona revisora:**
- **Entorno:** sistema operativo, arquitectura y versiones de runtime/herramientas
- **Requisitos previos y configuración:**
- **Comandos exactos:**
- **Salida observada / artefacto:**
- **Fallos y resolución:**
- **Decisión y justificación:**
- **Limitaciones conocidas:**

## Relación con otros documentos de validación

- El [plan de validación de laboratorios](lab-validation-plan.md) describe las carencias de evidencia y el método de validación.
- La [matriz de runtime de laboratorios](lab-runtime-matrix.md) describe las expectativas de runtime y evidencia de publicación.
- El [estado de implementación](IMPLEMENTATION-STATUS.md) registra cambios del repositorio y observaciones de CI.

**Regla de publicación:** no marcar un laboratorio como validado en la práctica sin evidencia de ejecución reproducible y una decisión de revisión registrada.

# Plan de validación reproducible de laboratorios

Estado: plan de trabajo; ningún laboratorio se declara verificado por esta revisión documental.

## Alcance y método

Esta revisión inspecciona las diez páginas de módulo en `src/modulos/` y el baseline de `docs/curriculum.md`. Confirma que cada laboratorio incluye una actividad central, instrucciones de ejecución o fases, entregables/evidencias y criterios de aceptación. **No** demuestra que los ejercicios funcionen en un entorno limpio, que los tiempos sean realistas ni que los criterios sean suficientemente discriminantes. Eso requiere ejecución independiente y registro de resultados.

## Inventario inicial

| Laboratorio | Página | Elementos visibles en el guion | Validación práctica pendiente |
|---|---|---|---|
| LAB-01 | M01 — Modelos, capacidades y límites | Preparación, ejecución, registro de evidencia, aceptación | Repetir casos en el entorno elegido; confirmar que los datos esperados permiten una evaluación consistente y registrar versión/modelo y variabilidad. |
| LAB-02 | M02 — Especificación de tareas y diseño | Escenario ficticio, fases de diagnóstico y especificación, revisión adversarial, entregables, aceptación | Comprobar con una persona no autora que la especificación se puede ejecutar sin contexto oral y que los criterios son observables. |
| LAB-03 | M03 — Ingeniería de contexto | Escenario y preparación, variantes, ejecución, registro, aceptación | Ejecutar comparaciones controladas; verificar que las variantes cambian una sola dimensión y que coste/latencia se registran cuando estén disponibles. |
| LAB-04 | M04 — Desarrollo asistido y revisión | Escenario, línea base, implementación asistida, revisión independiente, evidencia, aceptación | Ejecutar pruebas en repositorio de práctica; revisar diff, regresiones y reproducibilidad desde un checkout limpio. |
| LAB-05 | M05 — Agentes, herramientas y delegación | Escenario y preparación, ejecución controlada, revisión/evidencia, aceptación | Probar límites de permisos y efectos secundarios con herramientas de bajo riesgo; documentar los casos negativos y la recuperación. |
| LAB-06 | M06 — Harness y control de ejecución | Escenario, contrato, implementación y pruebas, entregables, aceptación | Ejecutar pruebas positivas y negativas del harness; demostrar que las políticas se aplican fuera de las instrucciones del modelo. |
| LAB-07 | M07 — Testing, evals y verificación | Objetivo, prerrequisitos/límites, procedimiento, evidencias, aceptación | Repetir la evaluación, comprobar cálculo de métricas y documentar cómo se tratan resultados no evaluables y regresiones. |
| LAB-08 | M08 — Seguridad y riesgos | Entorno seguro, procedimiento, evidencias, aceptación | Ejecutar pruebas adversariales en entorno aislado; confirmar que se verifica también la ausencia de efectos no autorizados. |
| LAB-09 | M09 — CI/CD, observabilidad y mantenimiento | Prerrequisitos/límites, procedimiento, evidencias, aceptación | Ejecutar el pipeline desde cero; provocar un fallo controlado y verificar alerta, bloqueo, rollback o recuperación según el ejercicio. |
| LAB-10 | M10 — Productividad, costes y gobernanza | Procedimiento, evidencias, aceptación | Probar las fórmulas con datos de ejemplo, separar coste medido de estimado y revisar que la recomendación reconoce limitaciones y sesgos. |

## Criterios comunes de salida

Cada laboratorio debe tener un registro de validación que incluya:

1. Commit de la página y fecha de validación.
2. Sistema operativo, versiones de runtime/herramientas y requisitos previos.
3. Instrucciones exactas para preparar un entorno limpio.
4. Pasos ejecutados, comandos o acciones y resultados observados.
5. Evidencias generadas y su ubicación, sin secretos ni datos personales innecesarios.
6. Resultado de cada criterio de aceptación: pasa, falla o no evaluable, con justificación.
7. Al menos un caso negativo cuando sea relevante; efectos laterales y recuperación comprobados.
8. Tiempo real empleado, puntos de bloqueo y diferencias frente a la duración planificada.
9. Revisor independiente y limitaciones pendientes.

## Orden de ejecución recomendado

1. **LAB-01 como piloto de método:** permite validar el formato de registro, la reproducibilidad y la distinción entre evidencia y juicio.
2. **LAB-02 y LAB-04:** comprobar especificación y revisión independiente antes de evaluar flujos con más autonomía.
3. **LAB-05, LAB-06 y LAB-08:** priorizar aislamiento, límites de herramientas, pruebas negativas y efectos no autorizados.
4. **LAB-07 y LAB-09:** comprobar métricas, automatización y recuperación.
5. **LAB-03 y LAB-10:** cerrar las comparaciones controladas, la medición de coste y las limitaciones de atribución.

Este orden es una propuesta operativa, no una modificación del currículo ni de la carga horaria aprobada.

## Bloqueos que no deben resolverse por suposición

- La matriz concreta de herramientas y versiones.
- El repositorio y la licencia para los ejercicios de desarrollo y el proyecto transversal.
- Los umbrales de evaluación, las ponderaciones y las reglas definitivas para fallos críticos de seguridad.
- Los datos o métricas no disponibles en el entorno de ejecución.

Si alguno de estos elementos impide una ejecución fiel, registrar el laboratorio como bloqueado en vez de sustituirlo silenciosamente por otra configuración.

## Definición de estados

- **Especificado:** la página describe actividad, entregables y criterios; no implica ejecución.
- **En validación:** existe una ejecución registrada, todavía incompleta o con fallos pendientes.
- **Verificado:** una persona distinta de la autora completó el guion en el entorno documentado y adjuntó evidencia de cada criterio.
- **Bloqueado:** falta una decisión, recurso o dependencia necesaria para una ejecución válida.

No cambiar el estado a «Verificado» solo porque compile el sitio o pase CI.

## Mapa de ejemplos y validación estructural

Usa esta tabla para localizar el ejemplo complementario y ejecutar el chequeo estructural correspondiente. Los comandos validan contratos y referencias definidos en el repositorio; no sustituyen la ejecución del laboratorio ni la revisión independiente descrita arriba.

| Laboratorio | Ejemplo resuelto | Comando estructural |
|---|---|---|
| LAB-01 | [Caracterización de modelo](lab01-worked-example.md) | `npm run check:lab01` |
| LAB-02 | [Especificación verificable](lab02-worked-example.md) | `npm run check:lab02` |
| LAB-03 | [Experimento de contexto A/B](lab03-worked-example.md) | `npm run check:lab03` |
| LAB-04 | [Revisión de código](lab04-worked-example.md) | `npm run check:lab04` |
| LAB-05 | [Herramientas y permisos](lab05-worked-example.md) | `npm run check:lab05` |
| LAB-06 | [Gate de publicación](lab06-worked-example.md) | `npm run check:lab06` |
| LAB-07 | [Puntuación y fallos críticos](lab07-worked-example.md) | `npm run check:lab07` |
| LAB-08 | [Modelado de amenazas](lab08-worked-example.md) | `npm run check:lab08` |
| LAB-09 | [Observabilidad y recuperación](lab09-worked-example.md) | `npm run check:lab09` |
| LAB-10 | [Productividad y gobernanza](lab10-worked-example.md) | `npm run check:lab10` |

### Ejecución conjunta

Desde la raíz del repositorio, con Node.js 20 o posterior y dependencias instaladas:

```bash
npm ci
npm run check
```

El comando conjunto construye el sitio, verifica rutas y metadatos curriculares y ejecuta los diez validadores de laboratorio. Si falla, registra el comando exacto, salida, commit y entorno; no conviertas un fallo en un resultado aprobado mediante cambios manuales en la evidencia.

Un resultado satisfactorio confirma únicamente las comprobaciones automatizadas implementadas. No demuestra que cada procedimiento se haya ejecutado en un entorno limpio, que las señales operativas funcionen en producción ni que los resultados de aprendizaje estén validados con alumnado.


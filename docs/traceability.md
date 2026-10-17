# Matriz de trazabilidad curricular — IMP-02

## Estado y criterio de lectura

Esta matriz conecta las competencias y los laboratorios que ya constan en `docs/curriculum.md`. Las páginas de los módulos publican resultados de aprendizaje resumidos, y los laboratorios incluyen fixtures y validadores en distinto grado de madurez. La asociación formal entre competencias y módulos, las actividades por lección, las evidencias generadas por el alumno y los criterios de aceptación siguen pendientes de revisión. La presencia de documentación o de un validador estructural no equivale a validación pedagógica ni a ejecución práctica.

- **Base aprobada**: identificador, competencia, módulo, laboratorio y carga horaria ya recogidos en el currículo.
- **Propuesta por validar**: asociación razonable por tema, pendiente de validación curricular.
- **Pendiente de validación**: la relación curricular, las actividades, las entregas del alumno y los criterios verificables deben revisarse antes de declarar una competencia demostrada.

## Competencias, resultados observables y evidencia disponible

Las páginas de los diez módulos ya contienen una sección «Resultados de aprendizaje». La matriz siguiente resume su resultado principal y enlaza con el artefacto del laboratorio. La presencia de un resultado o de un fixture no equivale a validación pedagógica ni a ejecución práctica satisfactoria.

| Competencia aprobada | Módulo y resultado observable resumido | Laboratorio y evidencia versionada | Estado de evidencia |
|---|---|---|---|
| COMP-01 — Model capabilities and limits (N3) | M01: comparar el comportamiento del modelo bajo condiciones controladas, identificar fallos y registrar resultados reproducibles. | LAB-01: `src/modulos/modelos-capacidades-limites.njk`; `fixtures/lab01-cases.json`; `scripts/check-lab01-fixtures.mjs`. | Fixture y validador presentes; la ejecución con modelos reales no queda demostrada por CI. |
| COMP-02 — Delegable task specification (N4) | M02: transformar una petición ambigua en alcance, preguntas bloqueantes, criterios verificables y condiciones de parada. | LAB-02: `src/modulos/especificacion-y-diseno.njk`; `fixtures/lab02-specification.json`; `scripts/check-lab02-specification.mjs`. | Criterios, evidencia y verificación declarados en la fixture; falta evidencia de ejecución del ejercicio. |
| COMP-03 — Context engineering (N3) | M03: comparar estrategias de contexto usando casos de referencia, fuentes y variables controladas. | LAB-03: `src/modulos/ingenieria-de-contexto.njk`; `fixtures/lab03-context-experiment.json`; `scripts/check-lab03-context-fixture.mjs`. | Fixture y política de medición presentes; no constituye un benchmark ejecutado. |
| COMP-04 — AI-assisted development and code review (N4) | M04: delimitar un cambio, verificar pruebas positivas, negativas y de regresión y revisar el diff de forma independiente. | LAB-04: `src/modulos/desarrollo-asistido-y-revision.njk`; `fixtures/lab04-code-review.json`; `scripts/check-lab04-code-review.mjs`. | Criterios y matriz de pruebas definidos; la fixture exige completar una línea base observada antes de aceptar. |
| COMP-05 — Agents and delegation (N3) | M05: definir contratos de herramientas, permisos mínimos, límites de ejecución y condiciones de aprobación/parada. | LAB-05: `src/modulos/agentes-herramientas-delegacion.njk`; `fixtures/lab05-tool-permissions.json`; `scripts/check-lab05-tool-permissions.mjs`. | Validador estructural en CI; los permisos reales requieren controles externos al modelo. |
| COMP-06 — Harness and execution control (N4) | M06: aplicar autorización determinista, gates y evidencias antes de permitir que una ejecución avance. | LAB-06: `src/modulos/harness-y-control-de-ejecucion.njk`; `fixtures/lab06-release-gates.json`; `scripts/check-lab06-release-gates.mjs`. | Validador estructural en CI; no configura ni ejecuta despliegues. |
| COMP-07 — Testing, evals, and verification (N4) | M07: construir una rúbrica versionada, puntuar casos con evidencia y registrar fallos críticos e incertidumbre. | LAB-07: `src/modulos/testing-evals-verificacion.njk`; `fixtures/lab07-evaluation.json`; `scripts/check-lab07-evaluation.mjs`. | Rúbrica y protocolo estructurados; la calidad de las evaluaciones exige revisión humana y muestras adecuadas. |
| Asignación pendiente de validación curricular | M08: modelar amenazas y comprobar rechazos y ausencia de efectos no autorizados. | LAB-08: `src/modulos/seguridad-y-riesgos.njk`; `fixtures/lab08-security-threats.json`; `scripts/check-lab08-security-threats.mjs`. | Modelo y casos adversariales definidos; el validador no ejecuta ataques reales. No se atribuye LAB-08 a una competencia hasta aprobar la relación formal. |
| COMP-08 — Operation and maintenance (N3) | M09: observar ejecuciones, diagnosticar incidentes y verificar rollback y recuperación. | LAB-09: `src/modulos/cicd-observabilidad-mantenimiento.njk`; `fixtures/lab09-observability-recovery.json`; `scripts/check-lab09-observability-recovery.mjs`. | Criterios y casos estructurados; la recuperación real debe probarse en un entorno controlado. |
| COMP-09 — Cost, governance, and responsibility (N4) | M10: comparar productividad y coste total, asignar responsabilidades y recomendar condiciones de adopción o retirada. | LAB-10: `src/modulos/productividad-costes-gobernanza.njk`; `fixtures/lab10-productivity-governance.json`; `scripts/check-lab10-productivity-governance.mjs`. | Métricas y criterios definidos con datos sintéticos; no son resultados de una evaluación empírica del curso. |

## Relaciones transversales que requieren validación

Los siguientes cruces son plausibles por tema, pero **no se consideran cobertura aprobada** hasta que se valide formalmente la relación entre competencia, resultados ya publicados en los módulos y evidencias:

- COMP-05 con M06/LAB-06: límites operativos y políticas ejecutables para agentes.
- COMP-06 con M07/LAB-07 y M09/LAB-09: controles, verificación y operación.
- COMP-07 con M04/LAB-04: revisión independiente y pruebas negativas. La relación de M08/LAB-08 con una competencia existente permanece pendiente de validación.
- COMP-08 con M06/LAB-06 y M10/LAB-10: control de ejecución y gobernanza operativa.
- COMP-09 con M05/LAB-05, M08/LAB-08 y M09/LAB-09: efectos de herramientas, riesgos y operación responsable.

Estas relaciones deben convertirse en filas explícitas con resultados y evidencia solo después de validación; no deben interpretarse como una decisión cerrada.

## Cadena de trazabilidad que debe validarse por cada resultado

| Campo | Requisito |
|---|---|
| Competencia | ID existente COMP-01–COMP-09; propuesta nueva solo tras aprobación |
| Resultado de aprendizaje | Resultado observable publicado en el módulo; comprobar verbo, producto/actuación y condición de ejecución |
| Lección/actividad | Referencia estable y oportunidad real de practicar el resultado; completar o enlazar si falta |
| Evidencia | Artefacto o registro inspeccionable generado por el alumno; distinguir fixture de ejemplo y entrega real |
| Criterio de aceptación | Condición objetiva vinculada a la evidencia y al resultado; comprobar cobertura y verificabilidad |
| Laboratorio | ID LAB-01–LAB-10 cuando corresponda |
| Verificación | Método, entorno, versión/contexto y resultado registrado |
| Estado | No especificado, Borrador, Verificado o Bloqueado |

## Decisiones abiertas

- Validar las asociaciones competencia–módulo propuestas y los cruces transversales.
- Normalizar los resultados de aprendizaje y completar la cadena resultado–actividad–evidencia–criterio por cada lección.
- Revisar el mapeo preliminar LAB-08/COMP-07 y cualquier cruce transversal con una persona responsable del currículo; no dar por aprobada una relación por afinidad temática.
tados de aprendizaje ya publicados y enlazarlos con actividades, evidencias y criterios verificables; no todos los fixtures tienen el mismo nivel de detalle.
- El proyecto transversal y la rúbrica ya tienen defaults operativos documentados; queda verificar el contrato con un repositorio candidato y calibrar la rúbrica antes de uso sumativo.
- Validar formalmente las asociaciones competencia–módulo y completar la cadena resultado–actividad–evidencia–criterio de aceptación sin atribuir relaciones no aprobadas.
- Ejecutar y documentar los laboratorios antes de marcarlos como verificados.

## Implementación de artefactos de LAB-05 a LAB-08

La revisión detectó que algunos fixtures y scripts estaban numerados según el orden en que se añadieron, no según el laboratorio aprobado. La correspondencia canónica queda fijada así:

| Laboratorio curricular | Fixture canónico | Validador canónico | Alcance de la comprobación |
|---|---|---|---|
| LAB-05 — Agentes, herramientas y límites | `fixtures/lab05-tool-permissions.json` | `scripts/check-lab05-tool-permissions.mjs` | Estructura de la política, riesgos, amenazas y criterios; no impone permisos reales |
| LAB-06 — Harness y políticas ejecutables | `fixtures/lab06-release-gates.json` | `scripts/check-lab06-release-gates.mjs` | Estructura de gates y evidencias; no ejecuta un despliegue ni verifica referencias remotas |
| LAB-07 — Testing y evals | `fixtures/lab07-evaluation.json` | `scripts/check-lab07-evaluation.mjs` | Estructura de rúbrica, pesos y casos; no evalúa salidas reales |
| LAB-08 — Seguridad y pruebas adversariales | `fixtures/lab08-security-threats.json` | `scripts/check-lab08-security-threats.mjs` | Estructura del modelo de amenazas y los casos; no ejecuta ataques reales |

Los validadores anteriores comprueban contratos de datos y campos obligatorios. Su éxito no demuestra por sí solo que un sistema de IA real sea seguro, que una evaluación sea representativa ni que un pipeline aplique las políticas. Esas afirmaciones requieren pruebas de integración y evidencia de ejecución independiente.

## Gate de evidencia para futuras revisiones

Esta tabla sirve para planificar la verificación; no declara que las actividades se hayan ejecutado. Actualizar la columna de estado únicamente con evidencia versionada y reproducible.

| Gate | Condición de aceptación | Evidencia mínima | Estado inicial |
|---|---|---|---|
| TG-01 — Integridad curricular | Los diez módulos, nueve competencias y diez laboratorios conservan IDs únicos y relaciones explícitas. | Salida de `npm run check:curriculum` asociada al commit revisado. | Pendiente de ejecución en el commit candidato |
| TG-02 — Fixtures de laboratorio | Cada fixture canónica es aceptada y las mutaciones inválidas se rechazan con el diagnóstico esperado. | Salida de `npm run check:lab01` … `npm run check:lab10` y `npm run check:validator-regressions`. | Pendiente de ejecución en el commit candidato |
| TG-03 — Rutas publicadas | Los enlaces locales de las páginas generadas apuntan a destinos existentes. | Salida de `npm run check:routes` después de construir. | Pendiente de ejecución en el commit candidato |
| TG-04 — Preparación para publicar | La lista de preparación contiene las secciones requeridas, campos únicos y salvaguardas de evidencia. | Salida de `npm run check:release-readiness` y `npm run test:release-readiness-mutations`. | Pendiente de ejecución en el commit candidato |
| TG-05 — Reproducibilidad integral | La secuencia completa termina con código cero en un entorno limpio compatible con la versión de Node declarada. | Log íntegro de `npm ci` y `npm run check`, con commit, versión de Node y fecha. | No demostrado por este documento |
| TG-06 — Validación pedagógica | Participantes completan las actividades previstas y los resultados se registran sin inventar datos ausentes. | Protocolo de piloto aprobado e informe real con denominadores, incidencias y limitaciones. | No ejecutado |

### Regla de cierre

No cambiar un gate a «aprobado» por la mera existencia de su script, fixture o documentación. Adjuntar la salida de la ejecución, revisar los fallos y registrar el commit exacto. Un gate sin evidencia permanece pendiente; un gate fallido bloquea la afirmación de preparación correspondiente.

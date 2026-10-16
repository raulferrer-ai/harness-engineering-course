# Matriz de trazabilidad curricular — IMP-02

## Estado y criterio de lectura

Esta matriz conecta las competencias y los laboratorios que ya constan en `docs/curriculum.md`. Las relaciones por módulo son **propuestas de trabajo inferidas de los títulos y descripciones aprobados**, no validaciones pedagógicas finales. Los resultados de aprendizaje observables, las actividades por lección, las evidencias concretas y los criterios de aceptación aún deben definirse y revisarse.

- **Base aprobada**: identificador, competencia, módulo, laboratorio y carga horaria ya recogidos en el currículo.
- **Propuesta por validar**: asociación razonable por tema, pendiente de validación curricular.
- **Pendiente de especificación**: no se afirma que existan lecciones, evidencias o criterios completos.

## Competencias y cobertura propuesta

| Competencia aprobada | Módulo propuesto | Laboratorio aprobado | Resultado observable por definir | Evidencia y criterio de aceptación |
|---|---|---|---|---|
| COMP-01 — Model capabilities and limits (N3) | M01 | LAB-01 — Model characterization (4 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-02 — Delegable task specification (N4) | M02 | LAB-02 — Ambiguous incident to specification (6 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-03 — Context engineering (N3) | M03 | LAB-03 — Context-engineering experiment (6 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-04 — AI-assisted development and code review (N4) | M04 | LAB-04 — Code change with independent review (8 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-05 — Agents and delegation (N3) | M05 | LAB-05 — Agent with tools and limits (8 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-06 — Harness and execution control (N4) | M06 | LAB-06 — Harness with executable policies (8 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-07 — Testing, evals, and verification (N4) | M07 | LAB-07 — Testing and evals (8 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-08 — Operation and maintenance (N3) | M09 | LAB-09 — CI/CD, observability, and recovery (6 h) | Pendiente de especificar y validar | Pendiente de diseñar |
| COMP-09 — Cost, governance, and responsibility (N4) | M10 | LAB-10 — Productivity, cost, and governance (4 h) | Pendiente de especificar y validar | Pendiente de diseñar |

## Relaciones transversales que requieren validación

Los siguientes cruces son plausibles por tema, pero **no se consideran cobertura aprobada** hasta que se revisen los resultados de aprendizaje y sus evidencias:

- COMP-05 con M06/LAB-06: límites operativos y políticas ejecutables para agentes.
- COMP-06 con M07/LAB-07 y M09/LAB-09: controles, verificación y operación.
- COMP-07 con M04/LAB-04 y M08/LAB-08: revisión independiente, pruebas negativas y validación adversarial.
- COMP-08 con M06/LAB-06 y M10/LAB-10: control de ejecución y gobernanza operativa.
- COMP-09 con M05/LAB-05, M08/LAB-08 y M09/LAB-09: efectos de herramientas, riesgos y operación responsable.

Estas relaciones deben convertirse en filas explícitas con resultados y evidencia solo después de validación; no deben interpretarse como una decisión cerrada.

## Cadena que debe completarse por cada resultado

| Campo | Requisito |
|---|---|
| Competencia | ID existente COMP-01–COMP-09; propuesta nueva solo tras aprobación |
| Resultado de aprendizaje | Verbo observable, producto/actuación y condición de ejecución |
| Lección/actividad | Referencia estable y oportunidad real de practicar el resultado |
| Evidencia | Artefacto o registro inspeccionable generado por el alumno |
| Criterio de aceptación | Condición objetiva que permite decidir si la evidencia cumple |
| Laboratorio | ID LAB-01–LAB-10 cuando corresponda |
| Verificación | Método, entorno, versión/contexto y resultado registrado |
| Estado | No especificado, Borrador, Verificado o Bloqueado |

## Decisiones abiertas

- Validar las asociaciones competencia–módulo propuestas y los cruces transversales.
- Definir resultados observables, actividades, evidencias y criterios de aceptación.
- Especificar el proyecto transversal, el entorno/herramientas y la licencia del repositorio.
- Aprobar reglas operativas de evaluación y fallos críticos de seguridad antes de automatizar puntuaciones.
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


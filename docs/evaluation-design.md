# Diseño de evaluación — 16 horas

## Estado

Este documento organiza el diseño de evaluación ya descrito en `docs/curriculum.md`. **No define todavía una nota de aprobado, ponderaciones, umbrales ni reglas de compensación.** Las reglas operativas y los fallos críticos de seguridad siguen pendientes de aprobación; no se debe automatizar la puntuación hasta resolverlos.

## Componentes previstos

La línea base reserva 16 horas e incluye cuatro componentes:

- evaluación conceptual;
- trabajo práctico individual;
- diagnóstico de fallos;
- defensa del trabajo y de las decisiones.

La distribución de horas, los formatos concretos, los criterios puntuables y los ajustes razonables requieren validación. La tabla siguiente es una propuesta de planificación, no una decisión aprobada.

| Componente | Horas propuestas | Qué observar |
|---|---:|---|
| Evaluación conceptual | 3 | Comprensión de límites, especificación, contexto, verificación y riesgo |
| Práctica individual | 6 | Capacidad de producir un cambio acotado y verificarlo |
| Diagnóstico de fallos | 3 | Calidad del análisis causal, evidencia y selección de controles |
| Defensa individual | 4 | Explicación de decisiones, alternativas, límites y evidencia |
| **Total** | **16** | |

## Evidencia que debe recogerse

### 1. Evaluación conceptual

- Preguntas ligadas a las competencias aprobadas COMP-01–COMP-09.
- Respuestas que exijan aplicar conceptos a escenarios, no solo recordar definiciones.
- Clave de corrección y explicación de qué evidencia justifica cada respuesta.
- Registro de preguntas ambiguas o con más de una respuesta razonable para corregirlas antes de la aplicación.

### 2. Trabajo práctico individual

- Enunciado acotado con estado inicial conocido y criterios explícitos.
- Entorno, dependencias y comandos de ejecución documentados.
- Artefacto producido por el alumno y diff inspeccionable.
- Resultados de pruebas, incluida la evidencia de los casos fallidos.
- Registro de límites, supuestos, decisiones humanas y uso de herramientas.
- Verificación independiente y declaración de riesgos residuales.

### 3. Diagnóstico de fallos

- Caso reproducible con síntomas y evidencia suficiente para investigarlo.
- Separación entre observación, hipótesis y causa confirmada.
- Prueba o experimento que discrimine entre explicaciones plausibles.
- Corrección o mitigación propuesta con pruebas de regresión.
- Declaración de incertidumbre cuando la evidencia no permita confirmar la causa.

### 4. Defensa individual

- Explicación de la especificación, alcance y criterios de aceptación.
- Justificación de contexto, herramientas, permisos y estrategia de verificación.
- Discusión de al menos una alternativa y de los riesgos residuales.
- Capacidad de localizar evidencias y explicar resultados sin atribuir al modelo una garantía que no existe.

## Dimensiones de una rúbrica por aprobar

Estas dimensiones se proponen para discusión. No tienen ponderación ni umbral aprobado.

- Corrección respecto a la especificación.
- Calidad y trazabilidad de la evidencia.
- Cobertura y pertinencia de las pruebas.
- Capacidad de detectar y explicar fallos.
- Respeto de alcance, permisos y límites de seguridad.
- Reproducibilidad y mantenibilidad.
- Calidad del razonamiento y reconocimiento de incertidumbre.
- Claridad de la comunicación técnica.

Cada dimensión necesitará descriptores observables por nivel, ejemplos de evidencia suficiente e insuficiente, y un procedimiento para resolver discrepancias entre evaluadores.

## Seguridad y decisiones bloqueantes

Antes de poner la evaluación en marcha, el equipo responsable debe aprobar expresamente:

- qué fallos de seguridad se consideran críticos;
- si algún fallo crítico impide aprobar con independencia de la puntuación agregada;
- cómo se verifica el fallo y cómo se evita un falso positivo;
- quién decide, qué evidencia registra y cómo puede el alumno solicitar revisión;
- qué condiciones de recuperación o repetición se permiten;
- cómo se mantienen condiciones equivalentes sin exponer sistemas o datos reales.

Hasta aprobar estas reglas, los evaluadores deben registrar los incidentes observados y elevarlos para decisión; no inventar sanciones o umbrales durante la corrección.

## Equidad, accesibilidad e integridad

- Publicar instrucciones, requisitos y criterios antes de evaluar.
- Ofrecer un entorno reproducible y alternativas cuando una herramienta o cuenta no esté disponible, sin exigir una suscripción de pago no aprobada.
- Evitar recoger datos personales innecesarios; definir acceso y retención de evidencias.
- Asegurar que las tareas puedan completarse con los apoyos de accesibilidad definidos para el curso.
- Distinguir la calidad del proceso de la marca o capacidad percibida de una herramienta concreta.
- Documentar cualquier ajuste de condiciones y comprobar que no altera la competencia que se evalúa.

## Puertas de aprobación

- [ ] Confirmar la distribución definitiva de las 16 horas.
- [ ] Aprobar resultados evaluables y su relación con COMP-01–COMP-09.
- [ ] Aprobar rúbrica, niveles, ponderaciones y umbral de aprobado.
- [ ] Aprobar los fallos críticos de seguridad y su tratamiento.
- [ ] Definir revisión, recuperación, integridad y conservación de evidencias.
- [ ] Pilotar la evaluación y comprobar duración, claridad y consistencia entre evaluadores.

No se debe presentar la evaluación como finalizada hasta cerrar estas decisiones y probar sus materiales.

# Diseño del proyecto transversal — 40 horas

## Estado

**Diseño inicial para revisión; no es todavía una especificación cerrada del proyecto.** La línea base aprobada reserva 40 horas al proyecto transversal. El repositorio de trabajo, su licencia, la matriz de herramientas/runtime y las reglas operativas de evaluación siguen pendientes de decisión. Este documento no selecciona esas opciones por cuenta propia.

## Propósito

Integrar las competencias del curso en un trabajo de ingeniería acotado donde el uso de IA se compare con una línea base y las decisiones se justifiquen con evidencia. El objetivo no es maximizar código generado, sino demostrar calidad, verificación, control de riesgos y capacidad de explicar las decisiones.

## Resultados propuestos para validación

Al terminar, el alumno debería poder:

- delimitar un problema y convertirlo en una especificación verificable;
- registrar una línea base antes de introducir cambios asistidos por IA;
- documentar el contexto, las herramientas y las intervenciones humanas relevantes;
- verificar el cambio con pruebas, revisión independiente y controles de seguridad proporcionales;
- comparar resultados, regresiones, esfuerzo de verificación, intervenciones, costes observables y mantenibilidad;
- comunicar límites de la evaluación, riesgo residual y una recomendación argumentada.

Estos resultados son una propuesta de diseño derivada de la descripción del proyecto en `docs/curriculum.md`; deben validarse antes de considerarse criterios curriculares definitivos.

## Distribución de trabajo propuesta

La distribución siguiente suma 40 horas y es orientativa; debe revisarse junto con el proyecto y las condiciones de evaluación.

| Fase | Horas propuestas | Trabajo |
|---|---:|---|
| 1. Selección y delimitación | 4 | Confirmar repositorio, licencia, problema, permisos y alcance |
| 2. Especificación y plan de verificación | 5 | Definir comportamiento esperado, exclusiones, riesgos y pruebas |
| 3. Línea base | 5 | Registrar commit, entorno, pruebas y métricas disponibles antes del cambio |
| 4. Implementación asistida | 10 | Iterar en una rama, registrar contexto y revisar cada cambio |
| 5. Verificación independiente | 7 | Ejecutar pruebas, casos negativos, revisión de diff y controles de seguridad |
| 6. Comparación y análisis | 5 | Comparar línea base y resultado, explicar costes, regresiones y limitaciones |
| 7. Informe y defensa | 4 | Preparar evidencias, recomendación y explicación de decisiones |
| **Total** | **40** | |

No se deben convertir estas horas en límites rígidos ni afirmar que son tiempos validados hasta realizar un piloto con alumnos.

## Requisitos del entorno por decidir

Antes de publicar el enunciado definitivo, el equipo debe acordar:

- repositorio de referencia, procedencia y licencia compatible con uso educativo;
- lenguajes, runtimes, dependencias y comandos reproducibles;
- herramientas de IA permitidas y alternativas sin suscripción de pago obligatoria;
- política de uso de herramientas, red, almacenamiento y ejecución de código;
- estrategia para secretos, datos personales y servicios externos;
- condiciones de acceso para alumnos con hardware o cuentas limitadas.

## Evidencias que debería entregar el alumno

1. Especificación del problema, alcance y criterios de aceptación.
2. Identificador del commit base, instrucciones de preparación y resultados iniciales.
3. Registro suficiente de herramientas, modelo/versión cuando esté disponible, contexto relevante e intervenciones humanas, sin incluir secretos.
4. Diff final y justificación de cambios importantes.
5. Resultados de pruebas positivas, negativas y de regresión; explicación de pruebas no ejecutables.
6. Revisión independiente y registro de hallazgos corregidos o aceptados como riesgo residual.
7. Comparación de calidad, regresiones, esfuerzo de verificación, intervención humana, coste observable y mantenibilidad.
8. Informe de limitaciones, riesgos residuales y recomendación.
9. Defensa individual de decisiones y evidencias.

## Condiciones de aceptación propuestas

- El cambio responde a una especificación acordada y el diff permanece dentro del alcance autorizado.
- La línea base y el resultado final son identificables y reproducibles.
- Las afirmaciones principales del informe enlazan con pruebas o evidencias inspeccionables.
- Las pruebas incluyen casos negativos y de regresión apropiados al cambio.
- La revisión independiente no se sustituye por la explicación del modelo.
- Los costes y tiempos no disponibles se declaran como tales; no se fabrican métricas.
- Se declaran las limitaciones de la muestra y no se generaliza más allá de la evidencia.
- No se incluyen credenciales, datos personales innecesarios ni efectos sobre sistemas de producción.

Estos puntos son criterios propuestos para revisión; no constituyen todavía una rúbrica aprobada ni definen por sí solos el aprobado.

## Decisiones de aprobación pendientes

- [ ] Seleccionar repositorio y verificar su licencia.
- [ ] Aprobar matriz de herramientas, versiones y entorno reproducible.
- [ ] Confirmar si se exige comparación con trabajo sin IA y cómo se controla la comparabilidad.
- [ ] Aprobar formato y política de conservación de evidencias.
- [ ] Aprobar rúbrica, ponderaciones, umbrales y reglas de fallos críticos de seguridad.
- [ ] Probar la carga de trabajo en un piloto y ajustar las 40 horas según observaciones.

## Rúbrica y defensa

Consulta [`docs/transversal-project-rubric.md`](transversal-project-rubric.md) para la rúbrica analítica propuesta, reglas de decisión con fallos críticos no compensables, protocolo de defensa individual y lista de comprobación docente. Está pendiente de aprobación y piloto; no es aún una política sumativa validada.

# Protocolo de piloto del curso — borrador para validación docente

## Estado

**Propuesta de trabajo; no es un piloto ejecutado ni una aprobación curricular.** No hay resultados empíricos registrados en este documento. La persona responsable debe aprobar el protocolo, la selección de participantes, las condiciones de privacidad y los criterios de decisión antes de recoger datos.

## 1. Objetivo

Comprobar si el curso puede completarse con las instrucciones, herramientas y evidencias previstas; detectar bloqueos técnicos o pedagógicos; medir el esfuerzo observado frente a las 160 horas totales planificadas, distinguiendo las 104 horas de los diez módulos de las 56 horas asignadas al proyecto transversal y la evaluación; y revisar si los criterios de aceptación se interpretan de forma consistente.

El piloto evalúa el diseño del curso, no demuestra por sí solo la eficacia general de la IA ni la competencia profesional de una población más amplia.

## 2. Preparación antes de convocar participantes

No iniciar el piloto hasta que una persona responsable confirme:

- [ ] Repositorio, licencia, commit inicial y procedimiento de instalación aprobados.
- [ ] Matriz de herramientas, versiones y alternativas accesibles documentada.
- [ ] Todos los laboratorios tienen instrucciones, precondiciones, salidas esperadas y criterios verificables.
- [ ] Los comandos de validación se han ejecutado en un entorno limpio y sus salidas se han conservado.
- [ ] La política de privacidad define qué datos se recogen, quién puede acceder, cuánto tiempo se conservan y cómo se eliminan.
- [ ] Se ha explicado a participantes el objetivo, la carga estimada, la voluntariedad y el uso de sus observaciones.
- [ ] Las adaptaciones de accesibilidad y los canales para comunicar bloqueos están disponibles.
- [ ] La rúbrica, los fallos críticos y el procedimiento para resolver desacuerdos están versionados.
- [ ] Se han separado errores conocidos, limitaciones aceptadas y elementos aún no validados.

Si una condición crítica no se cumple, registrar el bloqueo y posponer la actividad afectada en vez de tratarla como completada.

## 3. Diseño de la prueba

### Cohorte y alcance

Para una primera revisión formativa, se puede comenzar con un grupo pequeño de participantes representativos del público objetivo (por ejemplo, 3–5 personas), ajustando el tamaño a los recursos disponibles. Este número es una recomendación operativa, no un tamaño muestral validado ni suficiente para inferencia estadística.

Registrar experiencia previa relevante, sin recoger datos personales innecesarios. Explicitar qué actividades se observarán y qué partes se realizarán de forma autónoma.

### Recorrido

1. Instalación desde cero siguiendo únicamente las instrucciones publicadas.
2. Recorrido por la guía del curso y localización de los recursos requeridos.
3. Ejecución de un laboratorio introductorio y de al menos un laboratorio con controles de seguridad.
4. Entrega de evidencias mediante la plantilla publicada.
5. Realización del proyecto transversal o, si no cabe en el piloto, revisión de su especificación mediante una tarea de muestra claramente identificada como tal.
6. Aplicación de la rúbrica por dos evaluadores independientes cuando sea viable.
7. Entrevista breve de cierre y registro de problemas, propuestas y tareas no completadas.

No sustituir una ejecución real por una lectura del ejemplo resuelto sin etiquetar explícitamente la diferencia.

## 4. Registro por actividad

Conservar una fila por participante y actividad usando identificadores seudónimos:

| Campo | Qué registrar |
|---|---|
| Actividad / versión | ID de módulo o laboratorio y commit del material |
| Estado | Completada, bloqueada, incompleta o no iniciada |
| Tiempo activo | Tiempo dedicado, excluyendo pausas declaradas |
| Tiempo bloqueado | Duración y causa: entorno, instrucciones, herramienta o concepto |
| Ayuda necesaria | Tipo de pista o intervención; no registrar conversaciones privadas completas por defecto |
| Evidencia generada | Artefactos y referencias, saneados de datos sensibles |
| Criterios | Resultado por criterio: pasa, falla o no evaluable |
| Defectos detectados | ID, severidad, pasos de reproducción y estado |
| Observaciones | Dudas, errores de interpretación y sugerencias |
| Confianza del registro | Observado directamente, informado por participante o estimado |

No recoger prompts, transcripciones, identificadores de cuentas o salidas completas de servicios externos salvo que sean estrictamente necesarios, se hayan autorizado y exista una política de conservación explícita.

## 5. Métricas y definiciones

Calcular las métricas únicamente cuando se disponga de datos suficientes y conservar numeradores y denominadores.

- **Tasa de finalización:** actividades completadas / actividades iniciadas. Informar también abandonos y actividades no iniciadas; no ocultarlos en el denominador.
- **Tiempo observado:** mediana y rango por actividad, indicando número de participantes y valores ausentes. No presentar la mediana de un grupo pequeño como estimación universal.
- **Tasa de bloqueo:** actividades con bloqueo / actividades iniciadas, desglosada por causa.
- **Reproducibilidad:** ejecuciones en las que otra persona reproduce el resultado documentado / ejecuciones intentadas.
- **Defectos críticos:** número de defectos confirmados que permiten una acción no autorizada, exponen datos sensibles o invalidan un control obligatorio. Registrar cada caso y su evidencia.
- **Acuerdo entre evaluadores:** diferencias por dimensión y justificación de discrepancias. No afirmar fiabilidad validada sin análisis apropiado y suficientes observaciones.
- **Accesibilidad:** problemas detectados por revisión manual y automatizada, tecnología asistiva cuando sea posible y participantes que voluntariamente reporten barreras.

No combinar estos indicadores en una puntuación única sin justificar la ponderación. No atribuir causalidad a la IA sin un diseño comparativo adecuado.

## 6. Criterios de parada y decisión

### Parada inmediata de la actividad afectada

- Exposición de secretos, credenciales o datos personales no autorizados.
- Acción externa o modificación persistente fuera del alcance aprobado.
- Instrucciones o permisos ambiguos que puedan producir efectos relevantes.
- Fallo crítico confirmado en un control de seguridad.
- Imposibilidad de garantizar condiciones mínimas de privacidad o seguridad.

Contener el incidente, conservar solo la evidencia necesaria y saneada, informar a la persona responsable y no reanudar hasta documentar una decisión.

### Clasificación al cierre

- **Bloqueado:** hay un defecto crítico o una condición previa incumplida.
- **Requiere revisión:** existen defectos importantes, criterios ambiguos o evidencia insuficiente.
- **Apto para un piloto ampliado:** no quedan bloqueos críticos conocidos, las tareas centrales se pueden completar y las instrucciones permiten recoger evidencia interpretable.
- **Listo para uso curricular formal:** requiere además aprobación docente, revisión de accesibilidad, rúbrica aprobada, condiciones reproducibles y resolución documentada de los defectos relevantes. El piloto por sí solo no concede esta aprobación.

Estos estados son etiquetas de gestión propuestas, no certificaciones externas.

## 7. Informe de resultados

El informe final debe incluir:

1. Versión del protocolo, fechas y perfil agregado de participantes.
2. Actividades iniciadas, completadas, bloqueadas y no evaluables.
3. Tiempos observados con tamaños de muestra, rangos y limitaciones.
4. Defectos priorizados con evidencia reproducible, responsable y estado.
5. Diferencias entre evaluadores y cambios aplicados a la rúbrica.
6. Barreras de accesibilidad detectadas y acciones correctivas.
7. Cambios recomendados al contenido, las herramientas y las horas planificadas.
8. Decisión final, responsable, fecha y condiciones para repetir el piloto.

No rellenar métricas sin datos. Si no se realizó una actividad, indicarla como «no ejecutada». Si los resultados son insuficientes, declarar el piloto inconcluso.

## 8. Registro de cambios entre iteraciones

| Versión del curso | Hallazgo | Cambio realizado | Evidencia de revalidación | Decisión |
|---|---|---|---|---|
| [commit/versión] | [hecho reproducible] | [cambio concreto] | [prueba o piloto repetido] | [abierto/cerrado] |

Un defecto se considera cerrado cuando se verifica la corrección en la versión nueva; editar el texto sin volver a comprobar el comportamiento no basta.

## 9. Decisión pendiente

Antes de ejecutar este protocolo, el equipo docente debe asignar una persona responsable, aprobar privacidad y consentimiento, seleccionar la cohorte, fijar el commit del curso y acordar los criterios de aceptación. Hasta entonces, este archivo describe un procedimiento propuesto y no evidencia que el curso haya sido probado con alumnos.

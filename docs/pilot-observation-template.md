# Plantilla de observación del piloto

Usa una copia por sesión y una fila por actividad. Registra hechos observables, no impresiones sobre la capacidad general de una persona. No incluyas nombres, correo, cuentas ni conversaciones privadas completas.

## Datos de la sesión

- Versión del protocolo: [versión/commit]
- Versión del curso: [commit SHA]
- Fecha y zona horaria: [ISO 8601]
- Observador/a: [identificador interno]
- Código seudónimo: [P-01]
- Actividades previstas: [IDs]
- Entorno: [SO, runtime, versiones]
- Consentimiento/política comprobados por la persona responsable: [sí/no; referencia, no datos personales]

## Registro por actividad

| Campo | Registro |
|---|---|
| Actividad / módulo / laboratorio | [ID] |
| Commit del material | [SHA] |
| Estado | [completada / bloqueada / incompleta / no iniciada] |
| Hora de inicio / fin | [hora local con zona] |
| Tiempo activo | [minutos observados o informado] |
| Tiempo bloqueado | [minutos y causa] |
| Ayuda requerida | [ninguna / pista / intervención; describir sin transcripción privada] |
| Criterios que pasan/fallan/no son evaluables | [IDs] |
| Evidencia saneada | [ruta o identificador] |
| Defecto observado | [ID, severidad, pasos para reproducir] |
| Confianza del registro | [observado / informado / estimado] |
| Nota factual | [qué ocurrió, sin inferir causa no confirmada] |

## Incidencias y parada

| ID | Hecho observado | Riesgo | Acción inmediata | Responsable informado | Estado |
|---|---|---|---|---|---|
| [OBS-01] | [hecho] | [bajo/medio/alto/crítico] | [acción] | [código/rol] | [abierto/cerrado] |

Detén la actividad ante exposición de secretos/datos personales, acciones externas no autorizadas o fallo crítico de seguridad. No continúes para completar la muestra.

## Cierre de sesión

- Actividades completadas / iniciadas: [numerador/denominador]
- Bloqueos principales: [categorías y evidencia]
- Barreras de accesibilidad: [hechos observados o «no evaluadas»]
- Artefactos saneados y ubicación: [referencias]
- Eliminación/retención pendiente: [acción y responsable]
- Limitaciones de la observación: [qué no se pudo comprobar]

No calcular porcentajes sin registrar el numerador y el denominador. No presentar un tiempo estimado como tiempo observado.

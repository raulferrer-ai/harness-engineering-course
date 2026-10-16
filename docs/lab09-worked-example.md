# LAB-09 — Ejemplo resuelto: observabilidad y recuperación verificable

Este escenario es sintético. No describe un incidente real ni demuestra que un despliegue haya sido recuperado. Los identificadores, umbrales y relaciones del fixture `fixtures/lab09-observability-recovery.json` son la fuente de verdad para este ejemplo.

## 1. Servicio y línea base

| Campo | Valor del fixture |
|---|---|
| Servicio | `assistant-service-demo` |
| Entorno | `staging` |
| Línea base | `baseline-v1` |
| Estado de los datos | Ejercicio didáctico pendiente de revisión humana |

No copies los umbrales a producción sin calibrarlos con datos reales, objetivos de servicio aprobados y análisis de impacto.

## 2. Señales y respuesta operativa

| ID | Señal | Ventana | Umbral | Acción definida |
|---|---|---:|---|---|
| SIG-01 | `task_success_rate` | 15 min | < 0,95 | Pausar promoción y comparar con la línea base |
| SIG-02 | `tool_error_rate` | 10 min | > 0,05 | Deshabilitar la herramienta afectada y abrir incidente |
| SIG-03 | `p95_latency_ms` | 15 min | > 5.000 ms | Limitar tráfico y revisar trazas por etapa |
| SIG-04 | `unauthorized_action_count` | 5 min | > 0 | Contención inmediata y bloqueo de promoción |
| SIG-05 | `cost_per_accepted_task` | 60 min | > 1,5 EUR | Limitar presupuesto y revisar reintentos y contexto |

La señal SIG-04 es crítica: una acción no autorizada debe bloquear la promoción y activar el paso de recuperación REC-01. Una señal ausente o desconocida no se interpreta como estado saludable.

## 3. Eventos de auditoría

Los eventos definidos en el fixture son:

| ID | Evento | Datos que permiten verificar |
|---|---|---|
| EVT-01 | `run_started` | Ejecución, timestamp, revisión de origen y entorno |
| EVT-02 | `model_call_completed` | Versión de modelo, latencia, unidades de entrada/salida y estado |
| EVT-03 | `tool_invocation` | Herramienta, decisión, duración y resultado |
| EVT-04 | `evaluation_completed` | Versión de suite, puntuación, casos fallidos y decisión |
| EVT-05 | `recovery_action` | Incidente, acción, actor, timestamp y resultado |

Correlaciona los eventos con `run_id` y conserva los campos de auditoría definidos en el fixture. No registres tokens, secretos ni payloads personales completos; usa datos sintéticos y redacta cualquier marcador sensible antes de compartir evidencias.

## 4. Procedimiento de recuperación

Sigue los cuatro pasos de recuperación del fixture. No cambies sus IDs por IDs de pruebas ni los presentes como si fueran la misma entidad.

| Paso | Disparador | Acción | Verificación y condición de reversión |
|---|---|---|---|
| REC-01 | SIG-04 | Bloquear promoción y revocar la capacidad o credencial afectada | No hay nuevas acciones no autorizadas en pruebas sintéticas. Restaurar permisos solo tras revisión y autorización explícita |
| REC-02 | SIG-01 | Detener promoción, comparar con `baseline-v1` y aislar el fallo | La suite de regresión vuelve al umbral acordado; revertir a revisión y artefacto identificados |
| REC-03 | SIG-02 | Desactivar la herramienta fallida y pasar a modo degradado seguro | Las tareas restantes funcionan sin esa herramienta; rehabilitar tras prueba controlada y aprobación |
| REC-04 | SIG-03 | Reducir concurrencia o tráfico y revisar latencia por etapa | La latencia p95 vuelve al umbral durante dos ventanas consecutivas; retirar el límite gradualmente tras observar estabilidad |

Para el rollback, registra revisión inmutable y digest del artefacto. Un tag mutable o un artefacto no identificado no son un objetivo de recuperación válido.

## 5. Escenarios de validación

Los seis escenarios `OPS-T01`–`OPS-T06` del fixture deben cubrirse en un entorno aislado:

| Caso | Entrada controlada | Resultado esperado |
|---|---|---|
| OPS-T01 | La tasa de éxito cae por debajo del umbral durante la ventana definida | Se pausa la promoción, se registra evidencia y se compara con la línea base |
| OPS-T02 | Se detecta una acción no autorizada | Bloqueo inmediato, incidente y verificación de ausencia de nuevos efectos |
| OPS-T03 | Los logs incluyen un token señuelo | Se redacta el dato, se limita el acceso y no se replica el secreto en informes |
| OPS-T04 | El rollback apunta a un tag mutable o artefacto no identificado | La recuperación se bloquea hasta identificar revisión y artefacto inmutables |
| OPS-T05 | Una métrica se dispara por una muestra incompleta | Se aplica la ventana y la política de calidad de datos; una señal ausente no se inventa |
| OPS-T06 | El servicio responde tras rollback, pero falla la regresión | El servicio permanece en modo seguro y no se declara recuperación completa |

No inyectes fallos en producción para este laboratorio. Utiliza staging o un entorno desechable, datos sintéticos y controles que impidan efectos externos.

## 6. Contrato de recuperación

La recuperación solo puede declararse completa cuando se cumplen todos estos criterios:

- [ ] La revisión activa y el digest coinciden con el objetivo del rollback.
- [ ] Las comprobaciones de salud y la suite de regresión pasan.
- [ ] No quedan discrepancias de integridad ni tareas críticas en estado desconocido.
- [ ] Las señales están dentro de sus umbrales durante las ventanas definidas.
- [ ] Los logs sensibles se han saneado y se ha evaluado cualquier exposición.
- [ ] La decisión de reabrir está registrada con responsable, hora y evidencia.

Si el servicio responde, pero la regresión falla, el estado sigue siendo **recuperación incompleta**.

## 7. Criterios de aceptación y evidencia

| Criterio | Evidencia del fixture | Qué debe comprobarse |
|---|---|---|
| AC-01 — Señales accionables | SIG-01 a SIG-05 | Unidad, ventana, umbral y acción |
| AC-02 — Correlación de eventos | EVT-01 a EVT-05 | Campos obligatorios y correlación por ejecución |
| AC-03 — Contención de seguridad | OPS-T02 y REC-01 | Ensayo sintético y ausencia de nuevas acciones no autorizadas |
| AC-04 — Rollback verificable | OPS-T04 y OPS-T06 | Revisión y artefacto inmutables, regresión posterior |
| AC-05 — Telemetría segura | OPS-T03 | Redacción de marcadores sintéticos de secretos |
| AC-06 — Recuperación completa | REC-01 a REC-04 y OPS-T06 | Métricas, salud del servicio y suite de regresión |

Por cada ejecución conserva timestamp UTC, ID de incidente, revisión, entorno, señal, valor y unidad, ventana, umbral, decisión, acción, resultado, responsable y referencia de evidencia. Registra cada escenario como **APROBADO**, **NO APROBADO**, **INCONCLUSO** o **NO EJECUTADO**.

## 8. Entregable del alumno

Entrega un runbook, matriz de señales, contrato de eventos, línea temporal del incidente, resultados de OPS-T01 a OPS-T06, evidencias sanitizadas, decisión de recuperación y riesgos residuales. Distingue los casos diseñados de los realmente ejecutados.

## Relación con el fixture y el validador

El fixture `fixtures/lab09-observability-recovery.json` y el validador `scripts/check-lab09-observability-recovery.mjs` comprueban estructura, umbrales básicos, políticas obligatorias y referencias entre elementos. Ejecuta `npm run check:lab09` para esa validación estructural. No crea alertas, no ejecuta rollback y no demuestra la recuperación de un sistema real.

No marques el laboratorio como **Verificado** únicamente porque el sitio compile o el validador pase. La verificación requiere ejecución en el entorno documentado y evidencia revisada por una persona distinta.

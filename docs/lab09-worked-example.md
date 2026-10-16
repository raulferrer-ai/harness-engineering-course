# LAB-09 — Ejemplo resuelto: señal, contención, rollback y verificación

Los identificadores, métricas y resultados de este ejemplo son **sintéticos**. No son SLO reales ni evidencia de un despliegue ejecutado.

## 1. Escenario

Tras desplegar la revisión `r42`, un servicio de procesamiento presenta un aumento de errores. El objetivo del ejercicio es decidir si se detiene la promoción, contener el incidente y verificar una recuperación segura.

### Señales operativas de ejemplo

| Señal | Ventana | Umbral ilustrativo | Acción |
|---|---|---|---|
| Tasa de errores | 5 min | > 2 % | Detener promoción y abrir incidente |
| Latencia p95 | 10 min | > 800 ms | Comparar con línea base y revisar saturación |
| Integridad de tareas | Por lote | Cualquier discrepancia | Bloqueo inmediato; reconciliación antes de reanudar |
| Errores de autorización | 5 min | Cualquier evento confirmado | Contener la ruta afectada e investigar |
| Telemetría sensible | Por evento | Cualquier secreto detectado | Restringir acceso, sanear logs y rotar secreto si procede |

Estos umbrales solo sirven para el ejercicio. En producción deben derivarse de una línea base, objetivos de servicio aprobados y análisis de impacto.

## 2. Línea temporal simulada

| Hora | Evento | Evidencia | Decisión |
|---|---|---|---|
| 10:00 | Se promueve r42 a staging | Registro de release ligado a r42 | Observar |
| 10:03 | Errores alcanzan 3,1 % durante 5 min | Métrica de ejemplo | Bloquear promoción |
| 10:05 | Se confirma que el fallo coincide con r42 | Comparación con r41 en entorno equivalente | Autorizar rollback en staging |
| 10:08 | Se restaura r41 | Digest del artefacto y registro de operación | No reabrir todavía |
| 10:12 | Errores bajan a 0,4 %, latencia normal | Ventana de observación y prueba de regresión | Continuar verificación |
| 10:20 | Reconciliación de tareas sin discrepancias | Informe sintético de conteos y claves | Cerrar ejercicio con limitaciones anotadas |

La secuencia ilustra el procedimiento; no demuestra que un sistema real se haya recuperado.

## 3. Runbook de contención

1. **Detectar:** conservar la señal, ventana, versión y enlace al evento.
2. **Contener:** detener nuevas promociones; no borrar logs ni reintentar operaciones potencialmente no idempotentes.
3. **Evaluar impacto:** identificar tareas en vuelo, escrituras parciales y usuarios afectados sin volcar datos personales innecesarios.
4. **Revertir:** seleccionar un artefacto inmutable conocido, verificar su digest y registrar quién autorizó la operación.
5. **Comprobar:** ejecutar smoke tests, pruebas de regresión, reconciliación de tareas y comprobaciones de seguridad.
6. **Reabrir:** exigir que las señales permanezcan dentro de umbrales durante la ventana aprobada y que el responsable autorice la promoción.
7. **Aprender:** registrar causa raíz confirmada o pendiente, factores contribuyentes, acciones y responsables.

## 4. Contrato de recuperación

La recuperación solo se declara cuando se cumple todo lo siguiente:

- [ ] La revisión y el digest del artefacto activo coinciden con el objetivo del rollback.
- [ ] Los checks de salud y las pruebas de regresión requeridas pasan.
- [ ] No hay discrepancias de integridad en el trabajo procesado.
- [ ] Las métricas permanecen dentro de umbrales durante la ventana definida.
- [ ] No quedan tareas críticas en estado desconocido.
- [ ] Se han saneado logs sensibles y se han evaluado posibles exposiciones.
- [ ] La decisión de reabrir está registrada con responsable y hora.

Si no puede verificarse la integridad de datos, el servicio puede estar disponible pero la recuperación sigue **incompleta**.

## 5. Pruebas de fallo

| ID | Inyección controlada en entorno desechable | Resultado esperado |
|---|---|---|
| REC-01 | Aumentar artificialmente la tasa de errores | Gate bloquea promoción dentro de la ventana |
| REC-02 | Hacer que una prueba de regresión falle | No se reabre la promoción |
| REC-03 | Simular digest de rollback distinto | Operación bloqueada |
| REC-04 | Introducir discrepancia en un lote sintético | Recuperación incompleta hasta reconciliar |
| REC-05 | Incluir un token señuelo en telemetría | Alerta, acceso restringido y sanitización |
| REC-06 | Reiniciar servicio sin restaurar integridad | No se declara recuperación completa |

No inyectes fallos en producción para este laboratorio. Usa staging o un entorno aislado, fixtures sintéticas y controles para evitar efectos externos.

## 6. Registro mínimo del incidente

Cada evento debe incluir timestamp UTC, identificador de incidente, revisión, entorno, nombre de señal, valor y unidad, ventana, umbral, acción, resultado, referencia de evidencia y responsable. No incluyas tokens, secretos ni payloads personales completos. Para correlación, usa identificadores seudónimos y controles de acceso.

## 7. Entregable del alumno

Presenta un diagrama de estados (normal → degradado → contenido → rollback → verificación → recuperado), runbook, línea temporal con evidencias, resultados de REC-01 a REC-06, criterios de reapertura, riesgo residual y revisión posterior al incidente.

## Relación con el validador

Complementa `fixtures/lab09-observability-recovery.json` y `scripts/check-lab09-observability-recovery.mjs`. Ejecuta `npm run check:lab09` para validar estructura y referencias; esta comprobación no crea alertas ni ejecuta un rollback real.

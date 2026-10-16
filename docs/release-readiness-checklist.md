# Lista de comprobación de preparación para publicar

Esta lista convierte los artefactos de los laboratorios en una decisión de publicación auditable. No sustituye las políticas del equipo ni demuestra por sí sola la seguridad del sistema.

## 1. Alcance y procedencia

- [ ] La solicitud, el alcance permitido y las condiciones de parada están documentados.
- [ ] Se identifica la revisión exacta del repositorio y el conjunto de cambios revisado.
- [ ] Los datos de prueba, resultados y ejemplos sintéticos están etiquetados; no se presentan como mediciones reales.
- [ ] Las fuentes autoritativas están diferenciadas de notas históricas o instrucciones no confiables.

## 2. Cambio y verificación

- [ ] Existe una prueba de regresión que reproduce el defecto o riesgo relevante.
- [ ] Se registró el resultado de la línea base antes del cambio.
- [ ] Se ejecutaron las pruebas pertinentes después del cambio; se conservan comando, código de salida y referencia al resultado.
- [ ] Una revisión independiente del diff confirma que el cambio está dentro del alcance.
- [ ] Los fallos críticos no se ocultan mediante una puntuación media.

## 3. Herramientas, permisos y seguridad

- [ ] Cada herramienta tiene contrato, esquema de entrada/salida y permisos mínimos explícitos.
- [ ] Las operaciones destructivas o externas requieren la autorización prevista por la política.
- [ ] Los casos negativos comprueban rechazo y ausencia de efectos secundarios no autorizados.
- [ ] Los registros se redactan antes de persistir; se probaron con secretos canario sintéticos.
- [ ] Se documentaron amenazas relevantes, controles, responsable y riesgo residual.

## 4. Operación y recuperación

- [ ] Las señales de alerta tienen umbral, responsable y acción concreta.
- [ ] Las trazas permiten correlacionar tarea, operaciones, pruebas y revisión.
- [ ] Existe un procedimiento de contención y recuperación compatible con el sistema.
- [ ] La recuperación o rollback se verifica mediante evidencia, no solo por una declaración de éxito.
- [ ] Los artefactos necesarios para auditar la decisión están protegidos y tienen retención definida.

## 5. Decisión

Registrar una fila por publicación:

| Campo | Valor |
|---|---|
| Revisión exacta | |
| Responsable de la decisión | |
| Resultado de build y checks | |
| Evidencia de pruebas | |
| Fallos críticos abiertos | |
| Riesgo residual aceptado por | |
| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |
| Condiciones, vencimiento y responsable | |

### Reglas de decisión

1. **Bloquear** si hay un fallo crítico sin resolver, una prueba obligatoria ausente o un permiso no autorizado.
2. **Aprobar con condiciones** solo si la política del equipo permite el riesgo residual, cada condición tiene responsable y fecha, y no se elude un control obligatorio.
3. **Aprobar** únicamente con evidencia enlazada y revisión humana registrada.
4. Si una prueba no se ejecutó o no hay salida verificable, marcarla como **no verificada**; no inferir éxito.
5. Si no se puede determinar el estado por falta de datos, registrar **inconcluso** y mantener bloqueada la publicación cuando la evidencia sea obligatoria.

## Límites

Completar esta lista es un control de proceso; no demuestra por sí sola la seguridad del sistema ni constituye una certificación de seguridad o una garantía de calidad del modelo. Las pruebas estructurales de CI verifican los artefactos y reglas codificadas; la ejecución real, la adecuación de los umbrales y la aceptación del riesgo requieren evidencia del entorno y responsables humanos.

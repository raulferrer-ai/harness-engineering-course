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
- [ ] La revisión manual de accesibilidad aplicable está registrada con evidencia e incidencias resueltas o aceptadas formalmente.
- [ ] Los fallos críticos no se ocultan mediante una puntuación media.

## 3. Herramientas, permisos y seguridad

- [ ] Cada herramienta tiene contrato, esquema de entrada/salida y permisos mínimos explícitos.
- [ ] Las operaciones destructivas o externas requieren la autorización prevista por la política.
- [ ] Los casos negativos comprueban rechazo y ausencia de efectos secundarios no autorizados.
- [ ] Los registros se redactan antes de persistir; se probaron con secretos canario sintéticos.
- [ ] La privacidad y el consentimiento de participantes se revisaron antes de recoger datos; finalidad, acceso, conservación y eliminación están definidos.
- [ ] Se documentaron amenazas relevantes, controles, responsable y riesgo residual.

## 4. Operación y recuperación

- [ ] Las señales de alerta tienen umbral, responsable y acción concreta.
- [ ] Las trazas permiten correlacionar tarea, operaciones, pruebas y revisión.
- [ ] Existe un procedimiento de contención y recuperación compatible con el sistema.
- [ ] La recuperación o rollback se verifica mediante evidencia, no solo por una declaración de éxito.
- [ ] Los artefactos necesarios para auditar la decisión están protegidos y tienen retención definida.

## Evidencia práctica de los diez laboratorios

Antes de considerar completa la preparación del curso, revisar el [registro maestro de ejecución por laboratorio](lab-execution-register.md) junto con el [plan de validación](lab-validation-plan.md). La revisión manual de accesibilidad debe registrarse en el [registro de revisión de accesibilidad](accessibility-review-register.md); la lista de comprobación por sí sola no es evidencia de que la revisión se haya ejecutado. Los estados iniciales son «No evaluado» y solo pueden cambiar con logs de ejecución reproducibles y una decisión de revisión documentada. CI, fixtures y validadores de contrato no sustituyen la ejecución por participantes.

## Requisitos previos del piloto

Antes de invitar participantes o recoger datos, revisar el [protocolo del piloto](pilot-protocol.md), la [información para participantes](pilot-participant-information.md), la [plantilla de observación](pilot-observation-template.md) y la [encuesta de salida](pilot-exit-survey.md). Ejecutar los validadores y pruebas de mutación de salvaguardas del repositorio, pero no tratarlos como aprobación legal o ética.

- [ ] Responsable del piloto asignado nominalmente.
- [ ] Finalidad, base aplicable, minimización, conservación y eliminación de datos revisadas por la persona responsable.
- [ ] Información para participantes y consentimiento aprobados para el contexto real; no usar plantillas sin completar.
- [ ] Alcance de observación y encuesta limitado a datos necesarios; no recopilar credenciales, conversaciones privadas completas ni datos personales innecesarios.
- [ ] Procedimiento de parada, contención, notificación y borrado definido.
- [ ] Commit del curso, cohorte, criterios de aceptación y canal para incidencias registrados.
- [ ] Decisión de inicio documentada por la persona responsable.

**Regla de bloqueo:** si cualquier elemento anterior está pendiente, no iniciar la recogida de datos del piloto. Una CI verde solo demuestra que los checks configurados pasaron; no aprueba el tratamiento de datos ni autoriza el piloto.

## Registro de preparación del piloto (2026-10-19)

Este registro describe el estado de las salvaguardas documentales, no autoriza a comenzar el piloto ni la recogida de datos.

| Comprobación | Evidencia / estado |
|---|---|
| Salvaguardas automatizadas | [CI de `5009f86`](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/39223361050): satisfactoria, con pruebas de mutación de documentos del piloto. |
| Pruebas de ausencia de documentos | [CI de `5322d27`](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/39229074783): satisfactoria. |
| Requisitos previos de lanzamiento | [CI de `23e0b30`](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/39229676056): satisfactoria; comprueba el repositorio, no aprueba el tratamiento de datos. |
| Responsable nominal y revisión de privacidad | Pendiente; no hay aprobación documentada. |
| Consentimiento e información adaptados al contexto real | Pendiente; no utilizar las plantillas sin completar. |
| Decisión de inicio del piloto | BLOQUEADA hasta que se cumplan y documenten todos los requisitos previos. |

## Evidencia de publicación y decisión trazable

Para emitir una decisión, registrar en una copia de esta sección el SHA exacto de `main`, fecha, persona responsable, enlaces a la CI de ese SHA, al [registro de laboratorios](lab-execution-register.md), al [registro de accesibilidad](accessibility-review-register.md) y a las evidencias del piloto. Los resultados de un commit anterior no certifican automáticamente uno posterior.

| Gate | Estado inicial | Evidencia necesaria |
|---|---|---|
| CI del SHA candidato | No evaluado | URL de la ejecución completa y resultado de cada runtime |
| LAB-01 a LAB-10 | Bloqueado | Diez ejecuciones prácticas y decisiones de revisión documentadas |
| Accesibilidad manual | Bloqueado | Cobertura y resultados observados en el registro de accesibilidad |
| Calibración de rúbrica | Bloqueado | Evaluaciones independientes, discrepancias y decisión de calibración |
| Piloto con participantes | Bloqueado | Aprobación previa, ejecución, incidencias y cierre documentado |
| Decisión final | No autorizada | Responsable, fecha, SHA y justificación de cada gate |

No sustituir «Bloqueado» por «Aprobado» basándose únicamente en enlaces existentes o en CI verde.

## 5. Decisión

Registrar una fila por publicación:

| Campo | Valor |
|---|---|
| Revisión exacta | |
| Responsable de la decisión | |
| Resultado de build y checks | |
| Evidencia de pruebas | |
| Fallos críticos abiertos | |
| Accesibilidad manual | |
| Privacidad/consentimiento | |
| Riesgo residual aceptado por | |
| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |
| Condiciones, vencimiento y responsable | |

## Registro de revisión — integración de referencias técnicas (2026-10-18)

| Campo | Valor |
|---|---|
| Revisión exacta | `19ff1d7d29decc809369cedb1b8c4547b93447b9` (integrada en `main`) |
| Responsable de la decisión | Pendiente de asignación nominal para la publicación final |
| Resultado de build y checks | Build y verificación de CI completados con éxito en Node 22 y Node 24; ejecución de esta revisión: `39160414866`, completada correctamente. |
| Evidencia de pruebas | [CI de main, Node 22 y Node 24](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/39160414866); [commit de integración del registro](https://github.com/raulferrer-ai/harness-engineering-course/commit/19ff1d7d29decc809369cedb1b8c4547b93447b9); [sitio público](https://harnessengineeringcourse.netlify.app/) |
| Fallos críticos abiertos | No identificados por las comprobaciones automatizadas disponibles; la revisión manual sigue pendiente. |
| Accesibilidad manual | NO VERIFICADA: falta registrar revisión de los diez módulos en escritorio/móvil, navegación por teclado, foco visible y orden de lectura. |
| Precisión editorial | La nota de vigencia de Evals en `docs/references.md` se contrastó con la documentación oficial el 18-10-2026. La revisión integral de vigencia y relevancia de las fuentes de los diez módulos sigue pendiente. |
| Privacidad/consentimiento | No se ha identificado cambio de recopilación de datos en el alcance de esta integración; reevaluar si cambia el alcance. |
| Riesgo residual aceptado por | Pendiente; no inferido de la autorización general del propietario. |
| Decisión | BLOQUEAR la declaración de publicación final validada hasta completar y registrar la revisión humana. La integración en `main` ya está hecha. |
| Condiciones, vencimiento y responsable | Revisar los diez módulos en escritorio y móvil; validar teclado, foco visible y orden de lectura; completar la revisión de fuentes; asignar revisor nominal y registrar evidencias e incidencias antes de declarar completada la revisión de lanzamiento. |

### Reglas de decisión

1. **Bloquear** si hay un fallo crítico sin resolver, una prueba obligatoria ausente o un permiso no autorizado.
2. **Aprobar con condiciones** solo si la política del equipo permite el riesgo residual, cada condición tiene responsable y fecha, y no se elude un control obligatorio.
3. **Aprobar** únicamente con evidencia enlazada y revisión humana registrada.
4. Si una prueba no se ejecutó o no hay salida verificable, marcarla como **no verificada**; no inferir éxito.
5. Si no se puede determinar el estado por falta de datos, registrar **inconcluso** y mantener bloqueada la publicación cuando la evidencia sea obligatoria.

## Límites

Completar esta lista es un control de proceso; no demuestra por sí sola la seguridad del sistema ni constituye una certificación de seguridad o una garantía de calidad del modelo. Las pruebas estructurales de CI verifican los artefactos y reglas codificadas; la ejecución real, la adecuación de los umbrales y la aceptación del riesgo requieren evidencia del entorno y responsables humanos.

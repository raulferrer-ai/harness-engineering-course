# Plantilla de evidencia para laboratorios

Usa una copia de esta plantilla por cada ejecución de laboratorio. Sustituye los campos entre corchetes y conserva también los resultados fallidos. Una fixture incluida en el repositorio sirve como caso de partida: no debe presentarse como evidencia de una ejecución real del alumno.

## 1. Identificación de la ejecución

- **Laboratorio / módulo:** [LAB-xx / Mxx]
- **Alumno o equipo:** [identificador no sensible]
- **Fecha y zona horaria:** [ISO 8601]
- **Repositorio y revisión:** [URL o nombre; commit SHA]
- **Entorno:** [SO, runtime, versiones relevantes]
- **Modelo y versión:** [valor observado o «no disponible»]
- **Herramientas y configuración:** [herramientas, permisos, parámetros relevantes]
- **Estado:** [no iniciado / en curso / completado / bloqueado]

No incluyas claves API, tokens, datos personales, secretos del repositorio ni registros que no tengas autorización para compartir.

## 2. Objetivo y alcance

- **Pregunta que se quiere responder:** [pregunta concreta]
- **Resultado esperado:** [estado observable]
- **Dentro del alcance:** [acciones y archivos permitidos]
- **Fuera del alcance:** [acciones prohibidas]
- **Supuestos declarados:** [supuesto y cómo se validaría]
- **Condiciones de parada:** [hallazgos que requieren aclaración o autorización]

## 3. Procedimiento reproducible

Enumera los pasos ejecutados, en el orden real. Incluye comandos, configuración no sensible, entradas exactas y precondiciones necesarias.

| Paso | Acción o comando | Resultado observado | Evidencia / referencia |
|---|---|---|---|
| 1 | [acción] | [resultado] | [ruta, log saneado o enlace] |
| 2 | [acción] | [resultado] | [ruta, log saneado o enlace] |
| 3 | [acción] | [resultado] | [ruta, log saneado o enlace] |

Si un paso no se ejecutó, indícalo y explica por qué. No conviertas una acción propuesta en una acción realizada.

## 4. Casos y resultados

Define los resultados esperados antes de inspeccionar las salidas, cuando sea posible. Conserva las salidas originales y separa validez estructural de corrección semántica.

| Caso | Entrada / precondición | Resultado esperado | Resultado observado | Pasa / falla / no evaluable | Evidencia |
|---|---|---|---|---|---|
| CASE-01 | [entrada] | [esperado] | [observado] | [estado] | [referencia] |
| CASE-02 | [entrada] | [esperado] | [observado] | [estado] | [referencia] |

## 5. Criterios de aceptación

| ID | Criterio observable | Método de verificación | Resultado | Evidencia |
|---|---|---|---|---|
| AC-01 | [condición verificable] | [prueba / inspección] | [pasa / falla / no evaluable] | [referencia] |
| AC-02 | [condición verificable] | [prueba / inspección] | [pasa / falla / no evaluable] | [referencia] |

No declares el laboratorio aprobado si falla un criterio obligatorio o si falta evidencia para un criterio crítico. Explica cualquier excepción; no cambies los criterios después de ver el resultado para justificar una aprobación.

## 6. Fallos, riesgos y limitaciones

Para cada hallazgo, registra:

- **ID y severidad:** [ID / baja, media, alta, crítica]
- **Comportamiento observado:** [hecho, no interpretación]
- **Impacto potencial:** [consecuencia]
- **Evidencia:** [referencia reproducible]
- **Causa:** [confirmada / hipótesis / desconocida]
- **Control propuesto:** [medida]
- **Prueba negativa o de regresión:** [cómo demostrar que el control funciona]

Distingue lo medido de lo estimado y de lo desconocido. Si un control no se ha probado, indícalo explícitamente.

## 7. Revisión y conclusión

- **Resultado global:** [completado / bloqueado / incompleto]
- **Qué demuestra la evidencia:** [conclusión limitada a los casos probados]
- **Qué no demuestra:** [límites de la muestra, entorno o herramientas]
- **Intervenciones humanas necesarias:** [decisiones y aprobaciones]
- **Próximo paso recomendado:** [acción]
- **Revisor independiente y fecha:** [si aplica]

### Lista de comprobación final

- [ ] Entorno, versiones y revisión del repositorio identificados.
- [ ] Entradas y criterios de aceptación registrados.
- [ ] Resultados originales conservados y datos sensibles eliminados.
- [ ] Pruebas positivas, negativas y de regresión pertinentes ejecutadas.
- [ ] Fallos y limitaciones documentados sin ocultarlos.
- [ ] Conclusión proporcional a la evidencia disponible.

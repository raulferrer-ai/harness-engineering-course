# Plantilla de informe del proyecto transversal

**Uso:** copia este documento y completa los apartados con evidencia de tu ejecución. El informe no se considera completo por rellenar texto: cada afirmación importante debe remitir a un artefacto, comando, resultado o decisión verificable.

## 1. Identificación y alcance

- ID del proyecto: [PRJ-xx]
- Versión de esta plantilla: [commit SHA]
- Repositorio candidato y URL: [URL]
- Licencia y fuente de verificación: [MIT/BSD/Apache u otra; enlace]
- Commit base: [SHA]
- Commit final: [SHA]
- Sistema operativo y arquitectura: [valores observados]
- Runtime, versiones y gestor de paquetes: [valores observados]
- Herramienta/modelo de IA, versión y parámetros: [valor observado o «no disponible»]
- Tiempo total real y cómo se midió: [valor o «no medido»]

No incluyas credenciales, secretos, datos personales innecesarios ni conversaciones privadas completas.

## 2. Problema, especificación y aceptación

### Problema que se resuelve

[Descripción acotada y evidencia de que el problema existe.]

### Alcance

- Incluido: [archivos/comportamientos]
- Excluido: [límites explícitos]
- Supuestos: [supuesto, cómo se validó o estado no validado]
- Condiciones de parada: [cuándo detener y pedir decisión]

### Criterios de aceptación

| ID | Condición observable | Método de verificación | Resultado | Evidencia |
|---|---|---|---|---|
| AC-01 | [criterio] | [prueba/inspección] | [pasa/falla/no evaluable] | [ruta o log saneado] |
| AC-02 | [criterio] | [prueba/inspección] | [pasa/falla/no evaluable] | [ruta o log saneado] |

## 3. Línea base reproducible

| Paso | Comando exacto | Resultado observado | Evidencia |
|---|---|---|---|
| Instalación limpia | [comando] | [salida/código] | [log] |
| Pruebas iniciales | [comando] | [pasan/fallan/no ejecutable] | [log] |
| Lint/validaciones | [comando] | [salida] | [log] |

- Dependencias que no se pudieron instalar: [ninguna o lista]
- Fallos preexistentes: [ID, evidencia y efecto sobre la evaluación]
- Limitaciones de la línea base: [hechos]

No omitas fallos iniciales ni los atribuyas al cambio posterior sin evidencia.

## 4. Proceso de implementación

- Cambio realizado: [resumen]
- Archivos modificados: [lista]
- Intervenciones humanas: [decisiones, correcciones, revisión]
- Uso de IA: [tareas para las que se usó, herramienta y contexto relevante]
- Alternativas consideradas: [alternativa y motivo de descarte]
- Desviaciones de la especificación: [ninguna o justificación y aprobación]

### Resumen del diff

[Enlace al diff o commit; explicar cómo cada parte se relaciona con los criterios de aceptación.]

## 5. Verificación final

| Caso | Tipo (positivo/negativo/regresión) | Esperado | Observado | Estado | Evidencia |
|---|---|---|---|---|---|
| T-01 | [tipo] | [resultado] | [resultado] | [pasa/falla/no evaluable] | [log] |
| T-02 | [tipo] | [resultado] | [resultado] | [pasa/falla/no evaluable] | [log] |

- Pruebas no ejecutadas y motivo: [lista]
- Revisión independiente: [revisor/fecha o pendiente]
- Defectos encontrados: [IDs, severidad, estado]
- Regresiones: [ninguna observada o detalle]
- Controles de seguridad y alcance: [evidencia, no solo intención]
- ¿Hubo un fallo crítico? [no / sí; evidencia y decisión]

## 6. Comparación con la línea base

Completa solo métricas realmente observadas. Si una métrica no se puede obtener, escribe «no disponible» y explica por qué.

| Dimensión | Línea base | Resultado final | Método y fuente | Confianza / limitaciones |
|---|---|---|---|---|
| Corrección y criterios aceptados | [resultado] | [resultado] | [comando/evidencia] | [límites] |
| Defectos/regresiones | [número y severidad] | [número y severidad] | [registro] | [límites] |
| Esfuerzo de verificación humana | [tiempo observado] | [tiempo observado] | [método] | [límites] |
| Intervenciones humanas | [registro] | [registro] | [método] | [límites] |
| Coste de herramientas/modelos | [importe o no disponible] | [importe o no disponible] | [fuente] | [supuestos] |
| Mantenibilidad y complejidad | [evidencia] | [evidencia] | [revisión] | [límites] |

No atribuyas una mejora a la IA por una comparación no controlada. Declara factores de confusión, muestras pequeñas y diferencias en entorno o alcance.

## 7. Riesgos y gobernanza

| Riesgo o hallazgo | Severidad | Evidencia | Mitigación aplicada | Riesgo residual / aprobación |
|---|---|---|---|---|
| [RISK-01] | [baja/media/alta/crítica] | [referencia] | [control probado] | [pendiente/aceptado por rol autorizado] |

- Datos y secretos: [cómo se evitó incluirlos]
- Permisos y efectos externos: [controles aplicados y comprobación]
- Dependencias/licencias: [verificación]
- Acciones no autorizadas: [ninguna observada o incidente]
- Condiciones de rollback/retirada: [procedimiento]

## 8. Conclusiones y recomendación

### Qué demuestra la evidencia

[Conclusiones limitadas a los casos y entornos probados.]

### Qué no demuestra

[Aspectos no evaluados, datos ausentes, límites de muestra y supuestos.]

### Recomendación

- [ ] Aceptar dentro del alcance demostrado
- [ ] Corregir y volver a verificar
- [ ] Mantener bloqueado por riesgo/evidencia insuficiente
- [ ] Retirar el cambio

Justificación: [hechos y referencias].

## 9. Defensa individual

Prepara una explicación de 15–20 minutos que cubra:

1. problema, alcance y criterios de éxito;
2. línea base y reproducibilidad;
3. diff y decisiones importantes;
4. demostración de una prueba negativa o de regresión;
5. fallo, limitación o riesgo residual y su tratamiento;
6. alternativas, coste y conclusión proporcional a la evidencia.

### Preguntas que debes poder responder

- ¿Qué evidencia demostraría que tu conclusión es incorrecta?
- ¿Qué parte no se pudo verificar?
- ¿Qué hizo una persona y qué hizo la herramienta?
- ¿Qué cambiarías si el coste o el riesgo residual fueran mayores?
- ¿Qué condición obligaría a detener o revertir el cambio?

## 10. Revisión final

- [ ] Commit base/final y entorno identificados.
- [ ] Instalación y pruebas registradas con salidas originales saneadas.
- [ ] Criterios vinculados a evidencia.
- [ ] Revisión independiente registrada o marcada como pendiente.
- [ ] Fallos críticos y limitaciones declarados.
- [ ] Métricas ausentes no inventadas.
- [ ] No se exponen secretos ni datos personales innecesarios.
- [ ] La conclusión no excede lo que demuestra la evidencia.

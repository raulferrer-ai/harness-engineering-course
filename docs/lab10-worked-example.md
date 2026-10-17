# LAB-10 — Ejemplo resuelto: productividad neta y gobernanza basada en evidencia

Todos los valores numéricos de este ejercicio proceden del fixture sintético `fixtures/lab10-productivity-governance.json`. No son resultados observados de una implantación real. El fixture es la fuente de verdad para los datos, las métricas, las reglas y los vectores de decisión.

## 1. Comparación y límites de los datos

| Variable | BASE-01: flujo habitual | AI-01: flujo asistido |
|---|---:|---:|
| Tareas completadas | 40 | 42 |
| Entregas aceptadas | 34 | 35 |
| Tiempo de ciclo por tarea (min) | 90 | 75 |
| Minutos de trabajo humano por tarea | 65 | 52 |
| Defectos encontrados | 6 | 9 |
| Coste de infraestructura | 12 € | 18 € |
| Coste de modelo | 0 € | 24 € |
| Coste esperado de fallos | 30 € | 75 € |

El coste laboral supuesto es de **45 €/hora**. El fixture declara que la definición de tarea, los criterios de aceptación y la ventana de observación coinciden para el ejercicio; también declara `source_data_verified: false`. Por tanto, los resultados calculados son ilustrativos y no justifican por sí solos una decisión de despliegue.

## 2. Cálculos reproducibles

### Tasa de entregas aceptadas

`tasa de aceptación = entregas aceptadas / tareas completadas`

- BASE-01: 34 / 40 = **85,00 %**.
- AI-01: 35 / 42 = **83,33 %**.

El flujo asistido completa más tareas, pero su tasa de aceptación final es inferior en este conjunto de datos.

### Coste de trabajo humano

`coste laboral = minutos por tarea × tareas completadas / 60 × coste por hora`

- BASE-01: 65 × 40 / 60 × 45 € = **1.950 €**.
- AI-01: 52 × 42 / 60 × 45 € = **1.638 €**.

### Coste total y coste por entrega aceptada

`coste total = coste de modelo + infraestructura + trabajo humano + coste esperado de fallos`

- BASE-01: 0 € + 12 € + 1.950 € + 30 € = **1.992 €**.
- AI-01: 24 € + 18 € + 1.638 € + 75 € = **1.755 €**.

`coste por entrega aceptada = coste total / entregas aceptadas`

- BASE-01: 1.992 € / 34 = **58,59 €** por entrega aceptada.
- AI-01: 1.755 € / 35 = **50,14 €** por entrega aceptada.

La diferencia del coste unitario calculado es aproximadamente **−14,4 %** para AI-01. Sin embargo, el dato de origen no está verificado y el coste esperado de fallos es una estimación; la cifra no debe presentarse como ahorro demostrado.

### Defectos por entrega aceptada

`tasa de defectos = defectos encontrados / entregas aceptadas`

- BASE-01: 6 / 34 = **0,1765 defectos** por entrega aceptada.
- AI-01: 9 / 35 = **0,2571 defectos** por entrega aceptada.

AI-01 muestra más defectos por entrega aceptada. Por tanto, el menor coste unitario no basta para concluir que hay una mejora neta ni para autorizar una expansión.

### Tiempo y esfuerzo humano

El tiempo de ciclo declarado baja de 90 a 75 minutos por tarea; los minutos de trabajo humano bajan de 65 a 52. Son medidas diferentes: el tiempo de ciclo puede incluir esperas y retrabajo, mientras que el trabajo humano mide esfuerzo. No deben intercambiarse ni agregarse sin una definición explícita.

## Métricas definidas en el fixture

| ID | Métrica | Unidad | Interpretación |
|---|---|---|---|
| MET-01 | `accepted_delivery_rate` | Ratio | Entregas aceptadas / tareas completadas; más alto es mejor |
| MET-02 | `cycle_time_minutes` | Minutos por tarea | Tiempo desde tarea lista hasta entrega aceptada, incluyendo espera y retrabajo; más bajo es mejor |
| MET-03 | `cost_per_accepted_delivery` | EUR por entrega | Coste completo dividido entre entregas aceptadas; más bajo es mejor |
| MET-04 | `defect_rate` | Defectos por entrega aceptada | Defectos encontrados / entregas aceptadas; más bajo es mejor |
| MET-05 | `human_review_minutes` | Minutos por tarea | Preparación, revisión, corrección y validación humana; más bajo es mejor |

Las métricas no son intercambiables. En particular, la tasa de aceptación no sustituye la tasa de defectos y el tiempo de ciclo no equivale a los minutos de trabajo humano.

## 3. Decisión sobre los vectores de prueba

| Vector | Condición | Decisión esperada |
|---|---|---|
| TV-01 | Menor coste unitario, pero más defectos | `do_not_expand` |
| TV-02 | Falta una medición requerida | `inconclusive` |
| TV-03 | Acción externa sin aprobación | `block` |
| TV-04 | Escenario hipotético con tareas comparables, calidad no inferior, menor coste verificado y revisión humana | `expand_cautiously` |

TV-04 es una puerta hipotética, no una conclusión derivada de los datos actuales. Para superar esa puerta, la evidencia de origen debe verificarse y la comparación debe demostrar comparabilidad, calidad no inferior y menor coste total, con revisión humana documentada.

## 4. Reglas de decisión

- **No ampliar** si el tiempo mejora pero empeora la calidad o no hay una reducción de coste total demostrada.
- **Resultado inconcluso** si faltan mediciones, la fuente no es fiable o los grupos no son comparables. No sustituyas un dato desconocido por cero.
- **Bloquear** cualquier acción externa no aprobada y escalar al rol responsable.
- **Reclasificar el riesgo** si un caso de uso empieza a tratar datos confidenciales o personales.
- **Ampliar gradualmente** solo cuando las tareas sean comparables, la calidad cumpla el mínimo acordado, el coste total sea inferior y esté verificado, y una persona responsable apruebe la decisión.

## Reglas y escenarios de decisión del fixture

| ID | Condición | Resultado esperado |
|---|---|---|
| DEC-01 | Baja el coste por entrega aceptada y la calidad no empeora | Considerar expansión gradual con seguimiento |
| DEC-02 | Baja el tiempo, pero aumentan los defectos o el retrabajo | No declarar mejora neta; corregir y volver a medir |
| DEC-03 | Faltan datos fiables o los grupos no son comparables | Resultado inconcluso; recopilar evidencia |
| DEC-04 | Se exceden permisos, reglas de datos o riesgo aprobado | Detener el uso y escalar al responsable |

| Escenario | Entrada | Resultado esperado |
|---|---|---|
| VAL-T01 | Más tareas completadas, pero más defectos y mayor coste unitario | No afirmar aumento de productividad neta; explicar el trade-off |
| VAL-T02 | Falta el tiempo humano de uno de los grupos | Marcar cálculo incompleto; no imputar cero |
| VAL-T03 | Se propone una acción externa sin aprobación | Bloquear y solicitar aprobación al rol responsable |
| VAL-T04 | Un caso de bajo riesgo empieza a tratar datos confidenciales | Reclasificar riesgo y aplicar controles antes de continuar |
| VAL-T05 | El grupo asistido contiene tareas más sencillas | Declarar sesgo y repetir con tareas equivalentes |

## 5. Matriz de gobernanza del fixture

| ID | Caso de uso | Riesgo | Aprobación | Responsable |
|---|---|---|---|---|
| GOV-01 | Borradores internos no sensibles | Bajo | Revisión humana antes de uso externo | `content_owner` |
| GOV-02 | Modificar código y pruebas | Medio | Revisión independiente del diff y CI verde | `engineering_owner` |
| GOV-03 | Acciones externas o irreversibles | Alto | Aprobación humana explícita por acción | `operations_owner` |
| GOV-04 | Datos personales o confidenciales | Alto | Revisión de privacidad y autorización de datos | `data_owner` |

Cada fila también define una regla de datos y una condición de parada en el fixture. No interpretes una etiqueta de riesgo como permiso automático: el control y la aprobación exigidos deben cumplirse antes de actuar.

## 6. Criterios de aceptación

| Criterio | Evidencia del fixture | Comprobación |
|---|---|---|
| AC-01 — Coste completo | `comparison` y MET-01, MET-02, MET-03, MET-04 y MET-05 | Recalcular modelos, infraestructura, trabajo humano y coste esperado de fallos |
| AC-02 — Calidad de evidencia | `measurement_notes` y VAL-T01, VAL-T02, VAL-T03, VAL-T04 y VAL-T05 | Distinguir datos observados, estimaciones y datos desconocidos |
| AC-03 — Responsabilidad y controles | GOV-01, GOV-02, GOV-03 y GOV-04 | Confirmar riesgo, propietario, aprobación, regla de datos y parada |
| AC-04 — Acciones externas | GOV-03 y DEC-04 | Verificar que sin aprobación explícita la acción se bloquea |
| AC-05 — Mejora neta | DEC-01, DEC-02, DEC-03 y VAL-T01 | Revisar coste, calidad, retrabajo y comparabilidad |
| AC-06 — Decisión revisable | DEC-01, DEC-02, DEC-03, DEC-04 y TV-01, TV-02, TV-03 y TV-04 | Registrar decisión, responsable, evidencia y fecha de revisión |

## 7. Entregable del alumno

Entrega un cálculo reproducible, fuente y unidad de cada dato, supuestos, análisis de sensibilidad al coste laboral y a los fallos, métricas de calidad, matriz de gobernanza, decisión y criterios para ampliar, mantener, corregir o retirar el uso. Identifica explícitamente qué datos siguen sin verificar.

## Autoevaluación

- [ ] Los cálculos usan los valores del fixture y se pueden reproducir.
- [ ] El coste por entrega incluye trabajo humano y coste esperado de fallos.
- [ ] Distingo tasa de aceptación, defectos por entrega, tiempo de ciclo y esfuerzo humano.
- [ ] No afirmo causalidad ni ahorro real a partir de datos sintéticos.
- [ ] Los datos ausentes producen un resultado inconcluso, no un cero inventado.
- [ ] Las acciones de alto riesgo requieren los controles y aprobaciones definidos.
- [ ] La decisión tiene responsable, evidencia y fecha de revisión.

## Relación con el fixture y el validador

El fixture `fixtures/lab10-productivity-governance.json` define las métricas MET-01–MET-05, los controles GOV-01–GOV-04, las reglas DEC-01–DEC-04, los escenarios VAL-T01–VAL-T05 y los vectores TV-01–TV-04. Este ejemplo sigue sus datos e identificadores.

Ejecuta `npm run check:lab10` para validar estructura y coherencia básica. El validador no certifica los datos de origen, no demuestra causalidad y no decide si el caso de negocio es válido. La decisión real requiere revisión humana de fuentes, comparabilidad, privacidad, seguridad y contexto organizativo.

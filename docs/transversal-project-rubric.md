# Proyecto transversal — Rúbrica propuesta y protocolo de defensa

**Versión operativa v1.0 para preparación y piloto.** Esta rúbrica proporciona criterios aplicables desde el inicio para reducir ambigüedad. Los pesos y umbrales son decisiones de diseño provisionales: deben calibrarse en el piloto antes de usarse como política sumativa definitiva.

## 1. Rúbrica analítica

Cada dimensión se puntúa de 0 a 4. La puntuación ponderada se calcula como `peso × puntuación / 4`. El total se expresa sobre 100.

| Dimensión | Peso | Evidencia principal | Anclaje de 4 puntos |
|---|---:|---|---|
| Especificación y alcance | 15 % | Requisitos, exclusiones, criterios de aceptación | Requisitos verificables, ambigüedades resueltas y alcance respetado |
| Línea base y reproducibilidad | 15 % | Commit, entorno, comandos, salidas originales | Otra persona puede reproducir el estado inicial y final |
| Calidad técnica | 20 % | Diff, pruebas, regresiones y mantenibilidad | Pruebas pertinentes, cambio acotado y ninguna regresión sin resolver |
| Seguridad y control de riesgos | 20 % | Modelo de amenazas, casos negativos, evidencias | Controles proporcionados, sin fallos críticos abiertos y con riesgos residuales explícitos |
| Evaluación y análisis | 15 % | Comparación de resultados, costes y limitaciones | Métricas trazables, sesgos discutidos y conclusiones proporcionales a la evidencia |
| Comunicación y defensa | 15 % | Informe, referencias a evidencia y defensa individual | Explica decisiones, alternativas, fallos y límites sin atribuirse evidencia no observada |

### Anclajes generales

- **0 — Ausente o inválido:** no hay evidencia utilizable, o contradice el entregable.
- **1 — Insuficiente:** trabajo parcial, difícil de verificar o con defectos importantes.
- **2 — Básico:** evidencia presente, pero incompleta o con limitaciones relevantes.
- **3 — Competente:** cumple los requisitos acordados y permite verificar las afirmaciones principales.
- **4 — Sólido:** evidencia reproducible, decisiones justificadas, límites bien explicados y revisión crítica.

La puntuación 0 no debe usarse solo como penalización subjetiva; el evaluador debe anotar el requisito ausente o la contradicción observada.

## 2. Regla de decisión propuesta

No usar la media para compensar un fallo crítico. Antes de calcular el resultado:

1. Verificar identidad y completitud de las evidencias.
2. Comprobar que no hay credenciales expuestas ni acciones no autorizadas sobre sistemas reales.
3. Revisar fallos de integridad, pruebas falsamente declaradas como ejecutadas y cambios fuera del alcance autorizado.
4. Si hay un fallo crítico confirmado, clasificar como **NO APROBADO PENDIENTE DE CORRECCIÓN**, independientemente del total.
5. Si falta evidencia esencial, clasificar como **INCONCLUSO**, no como aprobado ni suspenso definitivo.
6. Si la evidencia está completa y no hay fallos críticos, aplicar el umbral operativo provisional: **70/100 y al menos 2/4 en cada dimensión**. Una dimensión por debajo de 2 requiere corrección y reevaluación aunque el total supere 70. El umbral es un punto de partida para el piloto, no una medida de fiabilidad o validez psicométrica; debe revisarse con las evidencias de calibración.

## 3. Protocolo de defensa individual (15–20 minutos propuestos)

- **3 min:** problema, alcance y criterio de éxito.
- **4 min:** recorrido por el diff y las decisiones de implementación.
- **4 min:** demostración de pruebas y una prueba negativa o de regresión.
- **4 min:** explicar un fallo, una limitación o un riesgo residual y cómo se verificó.
- **3–5 min:** preguntas del evaluador sobre alternativas, coste y conclusiones.

El alumno debe poder localizar evidencia concreta. No se exige memorizar detalles de herramientas, pero sí comprender y defender las decisiones presentadas como propias.

## 4. Calibración entre evaluadores

Antes de usar la rúbrica para calificar:

- dos evaluadores puntúan independientemente al menos dos entregas piloto;
- comparan las puntuaciones por dimensión y registran las discrepancias;
- revisan los anclajes ambiguos y actualizan la rúbrica con control de versión;
- acuerdan cómo resolver desacuerdos y cómo solicitar una revisión;
- repiten la calibración si cambian los criterios.

No presentar la concordancia como validada hasta recopilar resultados del piloto.

## 5. Plantilla de decisión

| Campo | Registro |
|---|---|
| Identificador del proyecto | |
| Commit base / commit final | |
| Versión de rúbrica | |
| Puntuación por dimensión y evidencia | |
| Fallos críticos y resolución | |
| Evidencia esencial ausente | |
| Puntuación ponderada | |
| Decisión y justificación | |
| Riesgo residual | |
| Evaluador y fecha | |
| Revisión solicitada / resolución | |

## 6. Lista de comprobación del docente

- [ ] Repositorio, licencia y entorno aprobados.
- [ ] Herramientas accesibles sin exigir una suscripción de pago no prevista.
- [ ] Política de datos, secretos, red y ejecución documentada.
- [ ] Rúbrica y regla de decisión aprobadas antes de evaluar.
- [ ] Evidencias y criterios comunicados al alumnado de antemano.
- [ ] Piloto realizado y carga real comparada con las 40 horas previstas.
- [ ] Proceso de revisión y adaptaciones razonables documentados.

## Relación con el proyecto transversal

Este documento complementa `docs/transversal-project.md`. La rúbrica es una propuesta de trabajo y no debe convertirse en criterio de evaluación sumativa hasta completar las decisiones de aprobación pendientes y un piloto con estudiantes.

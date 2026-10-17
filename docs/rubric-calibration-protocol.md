# Protocolo de calibración de la rúbrica del proyecto transversal

**Estado:** procedimiento propuesto para preparación y piloto; no afirma que se haya realizado una calibración real.  
**Relacionado:** [rúbrica v1.0](transversal-project-rubric.md), [proyecto transversal](transversal-project.md), [protocolo de piloto](pilot-protocol.md).

## Objetivo

Comprobar que dos evaluadores interpretan de forma suficientemente consistente las seis dimensiones de la rúbrica y que pueden justificar cada puntuación con evidencia identificable. La calibración no demuestra por sí sola validez pedagógica ni sustituye el piloto con participantes.

## Material necesario

- Versión congelada de la rúbrica y del enunciado, con commit SHA.
- Dos o más entregas de muestra anonimizadas y con el mismo conjunto de evidencias disponibles para todos los evaluadores.
- Hoja de puntuación independiente por evaluador.
- Registro de discrepancias, resolución y cambios propuestos.
- Criterios de privacidad, acceso, conservación y eliminación aplicables a las muestras.

No crear resultados ficticios para completar el registro. Si todavía no hay entregas reales, se pueden usar viñetas sintéticas para ensayar el procedimiento, pero deben etiquetarse como sintéticas y no cuentan como evidencia de calibración.

## Procedimiento

1. **Congelar la versión.** Registrar el SHA de la rúbrica, del enunciado y de las instrucciones de entrega.
2. **Preparar muestras.** Seleccionar al menos dos entregas que incluyan evidencia suficiente y, si existe, un caso con una limitación relevante. Anonimizar identificadores y retirar secretos.
3. **Puntuar por separado.** Cada evaluador puntúa las seis dimensiones de 0 a 4 sin consultar al otro. Para cada puntuación, cita una evidencia concreta y explica por qué corresponde al anclaje elegido.
4. **Calcular el total.** Aplicar por dimensión `peso × puntuación / 4`; sumar los resultados y comprobar el mínimo provisional de 2/4 en cada dimensión y cualquier fallo crítico no compensable.
5. **Comparar discrepancias.** Registrar toda diferencia de dos o más puntos en una dimensión y toda discrepancia que cambie el aprobado, el suspenso o la detección de un fallo crítico. Revisar también diferencias menores si la justificación no remite a evidencia.
6. **Resolver con evidencia.** Los evaluadores discuten el criterio aplicable, no la identidad o reputación del autor. Registrar la puntuación inicial de ambos, la decisión final razonada y si el desacuerdo revela una ambigüedad en la rúbrica.
7. **Revisar el instrumento.** Si el desacuerdo proviene de un anclaje ambiguo, proponer una modificación versionada. Repetir la puntuación de las muestras afectadas con la versión revisada.
8. **Autorizar el uso.** La persona responsable decide si la rúbrica está suficientemente clara para el piloto. No declarar validez estadística a partir de una muestra pequeña.

## Hoja de calibración

| Campo | Registro |
|---|---|
| Fecha y zona horaria | [ISO 8601 o pendiente] |
| Rúbrica / commit | [SHA] |
| Enunciado / commit | [SHA] |
| Evaluadores | [identificadores no sensibles] |
| Entregas evaluadas | [identificadores anonimizados; indicar si son sintéticas] |
| Diferencias por dimensión | [puntuaciones independientes] |
| Discrepancias que cambian el resultado | [sí/no; explicación] |
| Fallos críticos detectados | [evidencia; no inferir sin soporte] |
| Cambios propuestos | [ninguno o detalle] |
| Decisión | [no realizada / repetir / apta para piloto / requiere revisión] |
| Limitaciones | [muestra, evidencias ausentes, conflictos de interés] |

## Criterios de salida propuestos

La calibración puede considerarse **completada para preparar el piloto** únicamente cuando:

- todas las dimensiones se han puntuado independientemente para cada muestra;
- cada puntuación se apoya en evidencia concreta;
- todas las discrepancias de dos o más puntos y las que alteran el resultado tienen resolución documentada;
- las ambigüedades detectadas se resuelven o quedan declaradas como limitaciones;
- el commit exacto de la rúbrica y la decisión responsable quedan registrados.

Este resultado solo autoriza a preparar el piloto. No autoriza por sí solo el uso sumativo definitivo de la rúbrica.

## Límites

No usar esta hoja para inventar puntuaciones, inferir resultados de alumnos no observados o afirmar que la evaluación es fiable sin evidencia adecuada. Una ausencia de evidencia debe registrarse como tal, no interpretarse automáticamente como prueba de que una conducta no ocurrió.

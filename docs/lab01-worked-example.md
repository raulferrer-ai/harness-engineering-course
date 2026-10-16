# LAB-01 — Ejemplo resuelto: caracterizar un modelo con evidencia

Este documento es una guía de ejecución. No contiene resultados observados de un modelo; completa la hoja con salidas reales antes de emitir una conclusión.

## Objetivo

Evaluar por separado el cumplimiento de esquema, la corrección semántica, la abstención cuando falta información, el respeto de instrucciones y la reproducibilidad.

## Procedimiento

1. Inspecciona `fixtures/lab01-cases.json` y registra el commit del fixture.
2. Fija el modelo y su versión, parámetros, prompt, fecha y entorno.
3. Ejecuta cada caso y guarda la salida original sin secretos ni datos personales.
4. Puntúa cada dimensión por separado y adjunta evidencia concreta.
5. Si comparas configuraciones A/B, conserva las mismas entradas y cambia una variable cada vez.
6. Publica el tamaño de muestra, errores, casos ausentes y límites antes de concluir.

## Hoja de registro

| Campo | Registro |
|---|---|
| Caso / commit del fixture | |
| Modelo, versión y parámetros | |
| Hash de prompt/configuración | |
| Salida original | Referencia al artefacto |
| Validez del esquema | Sí / Parcial / No |
| Corrección semántica | 0–2 con justificación |
| Abstención adecuada | Sí / No / No aplicable |
| Latencia y coste | Medidos / No disponibles |
| Revisor y fecha | |

## Ejemplo hipotético

Entrada: «Extrae el identificador y la fecha; si la fecha no aparece, indica desconocido».

Salida hipotética: `{"id":"A-17","date":"2026-02-30"}`.

El JSON puede ser sintácticamente válido y aun así fallar semánticamente: la fecha no es válida y no debe inventarse si no aparece en la entrada. El resultado de este ejemplo es **no aprobado**. Es un caso inventado para explicar la rúbrica, no una respuesta observada de un modelo.

## Interpretación

Una mejora de formato no compensa un error crítico de contenido. Compara los resultados por caso y dimensión; investiga desacuerdos entre evaluadores y repite las pruebas cuando la salida sea estocástica. Si no se ejecutó el modelo, marca el resultado como pendiente.

## Entregable

Configuración reproducible, salidas originales, puntuaciones justificadas, desacuerdos de revisión, limitaciones y conclusión limitada a las pruebas realizadas.

## Relación con el validador

Ejecuta `npm run check:lab01` para validar la estructura de las fixtures. Este comando no invoca el modelo ni certifica la calidad de sus respuestas.

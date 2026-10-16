# LAB-02 — Fixture de especificación verificable

Este fixture convierte el reporte ambiguo del módulo M02 en un ejemplo estructurado de especificación y muestra por qué la decisión inicial es **bloquear la ejecución hasta aclarar datos críticos**.

## Archivos

- `fixtures/lab02-specification.json`: petición original, preguntas bloqueantes, supuestos, alcance permitido/prohibido, criterios de aceptación, evidencias, métodos de verificación y condiciones de parada.
- `scripts/check-lab02-specification.mjs`: comprobación estructural sin dependencias externas.

## Ejecutar

Con Node.js 20 o posterior:

```sh
npm run check:lab02
```

El control verifica la presencia de campos, cuatro criterios con condición/evidencia/verificación, IDs únicos y condiciones de parada. No juzga si los criterios son correctos para un producto real.

## Cómo usarlo en el laboratorio

1. Lee la petición original y redacta primero tus propias preguntas.
2. Compara tus preguntas con `blocking_questions`; justifica cuáles son bloqueantes y cuáles podrían resolverse inspeccionando el sistema.
3. Revisa cada supuesto y cada elemento de alcance; no los presentes como hechos conocidos del producto.
4. Examina los criterios AC-01–AC-04 y comprueba si cada uno tiene una evidencia observable y un método de verificación.
5. Realiza la lectura sin contexto: otra persona debe explicar qué puede cambiar, qué está prohibido y cuándo debe detenerse.
6. Registra discrepancias y revisiones. No sustituyas los datos que faltan por métricas inventadas.

## Limitaciones

Los umbrales de rendimiento, el entorno, la fuente de verdad y la ventana temporal siguen sin especificar en el reporte inicial. El ejemplo no fija valores numéricos porque hacerlo sin contexto sería inventar requisitos. Es un fixture didáctico sujeto a revisión humana, no una especificación aprobada para un sistema real.

## Ejemplo resuelto

Consulta [`docs/lab02-worked-example.md`](lab02-worked-example.md) para ver una petición ambigua transformada en especificación provisional, criterios verificables, plan de pruebas y una decisión de despliegue condicionada por evidencia y autorización.

## Ejemplo resuelto

Consulta [`docs/lab02-worked-example.md`](lab02-worked-example.md) para transformar una petición ambigua en requisitos verificables, preguntas bloqueantes, pruebas y una decisión de ejecución condicionada por evidencia.

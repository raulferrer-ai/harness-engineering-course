# LAB-04 — Fixture de cambio asistido y revisión independiente

Este paquete define un cambio didáctico pequeño para practicar la línea base, las pruebas positivas/negativas, la regresión y la revisión de diff. No incluye una implementación de producto ni simula resultados de pruebas.

## Archivos

- `fixtures/lab04-code-review.json`: solicitud, límites de alcance, criterios, matriz de pruebas y checklist de revisión.
- `scripts/check-lab04-code-review.mjs`: valida la consistencia estructural del fixture.

## Ejecución

Requiere Node.js 20 o posterior:

```sh
npm run check:lab04
```

## Procedimiento

1. Selecciona un repositorio de práctica real y registra su commit base, runtime, comandos y resultados de prueba antes de cambiar nada.
2. Mapea la solicitud del fixture a una función real. Si el proyecto elegido no tiene un comportamiento equivalente, documenta la adaptación antes de implementar.
3. Pide al asistente una propuesta, pero revisa supuestos y alcance antes de aplicarla.
4. Ejecuta los casos positivos, negativos y de regresión; conserva salidas originales antes y después.
5. Revisa el diff contra los criterios y límites. La revisión debe poder hacerla otra persona sin depender de la explicación del asistente.
6. Registra cada criterio como pasa, falla o no evaluable y toma una decisión explícita: aceptar, pedir cambios, rechazar o bloquear.

## Puerta de integración

El fixture deja la decisión por defecto en `blocked`. Solo puede recomendarse integración cuando la línea base está documentada, cada criterio tiene evidencia y no hay regresiones nuevas sin explicar. El validador automático no inspecciona código de aplicación, no ejecuta pruebas del proyecto elegido y no aprueba el cambio.

## Ejemplo resuelto

Consulta [`docs/lab04-worked-example.md`](lab04-worked-example.md) para una implementación de práctica con casos de aceptación, checklist de revisión independiente y una decisión de integración explícitamente bloqueada hasta aportar evidencia real.

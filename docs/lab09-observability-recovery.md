# LAB-09 — CI/CD, observabilidad y recuperación

Diseña un circuito operativo que conecte señales, alertas, contención, reversión y verificación posterior. La recuperación no se considera completa solo porque el servicio vuelva a responder.

## Ejecutar

```sh
npm run check:lab09
```

## Procedimiento

1. Ajusta los umbrales a una línea base observada; los valores de la fixture son ejemplos, no SLO aprobados.
2. Vincula cada señal a una acción concreta, responsable y ventana de evaluación.
3. Emite eventos estructurados con identificadores de ejecución, revisión y herramienta; redacta secretos y minimiza datos personales.
4. Simula fallos en staging o un entorno desechable: regresión, error de herramienta, latencia, acción no autorizada y telemetría sensible.
5. Practica contención y rollback hacia una revisión y un artefacto inmutables.
6. Verifica la recuperación con métricas y pruebas de regresión antes de reabrir la promoción.

## Criterios de aceptación

- Las señales incluyen unidad, ventana, umbral y respuesta operativa.
- Los eventos permiten correlacionar la ejecución y su revisión.
- Los fallos críticos bloquean la promoción y activan contención.
- El rollback se verifica; no basta con que el servicio arranque.
- Los registros no exponen secretos.

## Limitaciones

El validador automático solo comprueba la estructura y las referencias internas de la fixture. No instala alertas, accede a telemetría real, ejecuta rollback ni prueba un entorno de producción.

## Ejemplo resuelto

Consulta [`docs/lab09-worked-example.md`](lab09-worked-example.md) para un runbook con señales, timeline simulado, rollback, verificación de integridad y pruebas de fallo.

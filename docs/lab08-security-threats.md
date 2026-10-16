# LAB-08 — Modelo de amenazas y pruebas adversariales

Construye un modelo de amenazas para una aplicación con IA y verifica controles frente a entradas maliciosas, intentos de acceso no autorizado y acciones externas no aprobadas.

## Archivos y ejecución

- `fixtures/lab08-security-threats.json`: activos, límites de confianza, amenazas, casos de prueba y criterios de aceptación.
- `scripts/check-lab08-security-threats.mjs`: validador estructural.

```sh
npm run check:lab08
```

## Procedimiento

1. Usa un entorno aislado, datos sintéticos y ninguna credencial real.
2. Identifica activos, actores, límites de confianza y consecuencias.
3. Ejecuta casos negativos de contenido no confiable, acceso fuera del workspace, transferencia externa y aprobación inválida.
4. Comprueba tanto la denegación como la ausencia de efectos secundarios.
5. Conserva una traza sanitizada y registra riesgo residual, control, responsable y limitaciones.

## Criterios de aceptación

- Las instrucciones incluidas en documentos no pueden ampliar permisos.
- Las acciones no autorizadas se bloquean en la capa de control, no solo mediante el prompt.
- Los intentos alternativos no eluden la política centralizada.
- Los registros permiten auditar la decisión sin exponer secretos.

## Limitaciones

El validador estructural no ejecuta ataques ni demuestra la eficacia de controles reales. La verificación requiere ejecución práctica en un entorno aislado y revisión independiente.

## Ejemplo resuelto

Consulta [`docs/lab08-worked-example.md`](lab08-worked-example.md) para un modelo de amenazas con activos, cinco amenazas, pruebas adversariales, verificación de efectos secundarios y evaluación del riesgo residual.

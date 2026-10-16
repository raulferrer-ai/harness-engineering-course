# LAB-05 — Permisos de herramientas y aislamiento

Diseña y verifica límites de autorización para un agente que lee archivos, ejecuta pruebas y propone cambios. Impide que instrucciones no confiables o errores del agente se conviertan en acciones no autorizadas.

## Archivos y ejecución

- `fixtures/lab05-tool-permissions.json`: matriz de herramientas, riesgos, permisos, amenazas y criterios.
- `scripts/check-lab05-tool-permissions.mjs`: validador estructural.

```sh
npm run check:lab05
```

## Procedimiento práctico

1. Trabaja en un entorno desechable con datos sintéticos; no uses credenciales reales.
2. Clasifica cada herramienta por riesgo, recursos permitidos, operaciones denegadas y requisitos de aprobación.
3. Implementa controles fuera del prompt: permisos del sistema operativo, sandbox, allowlist de comandos y restricciones de red.
4. Ejecuta los casos negativos y conserva los registros de autorización.
5. Comprueba que el contenido de archivos no puede conceder permisos.
6. Revisa de forma independiente que los intentos denegados no produjeron efectos secundarios.

## Limitaciones

El validador comprueba la estructura de la fixture. No crea un sandbox ni demuestra que los controles de una implementación real sean efectivos.

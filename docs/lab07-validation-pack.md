# LAB-07 — Permisos de herramientas y aislamiento

Diseña y verifica límites de autorización para un agente que lee, ejecuta pruebas y propone cambios. El objetivo es impedir que instrucciones no confiables o errores del agente se conviertan en acciones con efectos no autorizados.

## Ejecutar

```sh
npm run check:lab07
```

## Procedimiento práctico

1. Trabaja en una máquina virtual o contenedor desechable con datos sintéticos; no uses credenciales reales.
2. Clasifica cada herramienta por riesgo, recursos permitidos, operaciones denegadas y requisitos de aprobación.
3. Implementa los controles fuera del prompt: permisos del sistema operativo, sandbox, allowlist de comandos y restricciones de red.
4. Ejecuta los casos negativos de la fixture y conserva los registros de autorización.
5. Comprueba que el contenido de archivos se trata como dato no confiable y no puede conceder permisos.
6. Revisa de forma independiente que los intentos denegados no produjeron efectos secundarios.

## Criterio de aceptación

La decisión predeterminada es denegar. La revisión debe comprobar el control real en el entorno aislado, no solo la existencia de una política escrita.

## Limitaciones

El chequeo automático valida el formato de la fixture. No crea un sandbox ni demuestra que los controles de una implementación real sean efectivos.

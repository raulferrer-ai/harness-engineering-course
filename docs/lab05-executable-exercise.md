# LAB-05 — Simulador ejecutable de política de herramientas

Este ejercicio implementa un **simulador didáctico de decisiones de autorización**. No es un sandbox del sistema operativo y no sustituye permisos reales, aislamiento de red ni revisión de seguridad.

## Ejecución

Desde la raíz del repositorio, con Node.js 22 o posterior:

```sh
node --test examples/transversal-project-starter/test/tool-policy.test.mjs
```

## Casos cubiertos

- Denegación por defecto de herramientas desconocidas y solicitudes incompletas.
- Lectura limitada al prefijo `workspace/`, con denegación de rutas con `../` y archivos `.env`.
- Ejecución de pruebas solo con la operación preaprobada; red deshabilitada por defecto.
- Aprobación explícita para borrado, publicación y envío externo.

## Límites y uso seguro

Las pruebas verifican la lógica del simulador, no una barrera de seguridad del sistema operativo. La función recibe nombres de recursos ya normalizados de forma didáctica; un sistema real debe canonicalizar rutas, resolver enlaces simbólicos y hacer cumplir las reglas en una capa de herramienta aislada. No introducir secretos ni ejecutar ataques contra sistemas reales.

# LAB-08 — Gates de calidad y publicación segura

Diseña una puerta de publicación en la que cada decisión se vincule a un commit, resultados verificables, revisión, identidad del artefacto y aprobación autorizada.

## Ejecutar

```sh
npm run check:lab08
```

## Ejercicio

1. Construye un registro para un commit candidato y adjunta referencias a build, pruebas y revisión.
2. Ejecuta los escenarios de evidencia ausente, logs obsoletos, commit inconsistente y digest distinto.
3. Comprueba que una aprobación humana no puede anular un fallo de pruebas.
4. Separa la decisión «elegible para publicar» de la acción real de desplegar.
5. Revisa que los permisos de publicación residan en CI/CD y no únicamente en el agente.

## Limitaciones

El validador solo comprueba la estructura del fixture; no accede a GitHub Actions, no valida referencias ni configura despliegues reales. Los controles efectivos requieren protección del entorno y permisos mínimos en el proveedor de CI/CD.

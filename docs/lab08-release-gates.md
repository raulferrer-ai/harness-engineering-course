# LAB-06 — Gates de ejecución y publicación

Vincula cada decisión de avance a una revisión concreta, resultados de build y pruebas, identidad del artefacto y aprobación autorizada.

## Archivos y ejecución

- `fixtures/lab06-release-gates.json`: evidencias requeridas, gates, escenarios negativos y política de bloqueo.
- `scripts/check-lab06-release-gates.mjs`: validador estructural.

```sh
npm run check:lab06
```

## Ejercicio

1. Construye un registro para un commit candidato y adjunta referencias a build, pruebas y revisión.
2. Ejecuta escenarios de evidencia ausente, logs obsoletos, commit inconsistente y digest distinto.
3. Comprueba que una aprobación humana no anula un fallo de pruebas.
4. Separa «elegible para publicar» del despliegue real.
5. Revisa que los permisos de publicación residan en CI/CD y no únicamente en el agente.

## Limitaciones

El validador solo comprueba la estructura del fixture; no valida referencias ni configura despliegues reales. Los controles efectivos requieren protección del entorno y permisos mínimos en CI/CD.

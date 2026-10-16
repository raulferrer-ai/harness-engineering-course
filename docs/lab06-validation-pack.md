# LAB-06 — Harness ejecutable y gates de control

Diseña una puerta de ejecución que vincule una decisión de avance a una revisión concreta, resultados de build y pruebas, identidad del artefacto y aprobación autorizada.

## Archivos y ejecución

- `fixtures/lab06-release-gates.json`: evidencias requeridas, gates, escenarios negativos y política de bloqueo.
- `scripts/check-lab06-release-gates.mjs`: validador estructural.

```sh
npm run check:lab06
```

## Ejercicio

1. Construye un registro para un commit candidato y adjunta referencias a build, pruebas y revisión.
2. Ejecuta escenarios de evidencia ausente, commit inconsistente y digest distinto.
3. Comprueba que una aprobación humana no anula un fallo de pruebas.
4. Separa «elegible para avanzar» de la acción real de desplegar.
5. Revisa que los permisos efectivos se apliquen en CI/CD y no únicamente en el agente.

## Limitaciones

El validador comprueba la estructura del fixture; no valida que las referencias existan ni configura despliegues reales. Los controles efectivos requieren protección del entorno y permisos mínimos en CI/CD.

# LAB-09 — Ejercicio ejecutable de recuperación y promoción

Este ejercicio simula las transiciones de un proceso de recuperación. No despliega servicios ni ejecuta un rollback real.

## Ejecución

Desde la raíz del repositorio con Node.js 22 o posterior:

```sh
npm run test:lab09-recovery
```

## Criterios comprobados

- La secuencia requiere degradación, contención y rollback.
- No se puede saltar directamente de degradación a rollback ni declarar recuperación antes de verificar el rollback.
- Un rollback fallido vuelve a contención.
- La promoción requiere recuperación verificada, regresión aprobada, artefacto verificado y cierre del incidente.

Los resultados solo validan esta máquina de estados. Para demostrar recuperación real, adjunta la evidencia de staging/sandbox descrita en `docs/lab-evidence-template.md` y `docs/lab-validation-plan.md`.

# LAB-06 — Ejemplo resuelto: gate de publicación ligado a evidencias

Este ejemplo usa identificadores y resultados **sintéticos**. No certifica una publicación ni configura un entorno real.

## 1. Objetivo

Un agente propone publicar el artefacto `app.tar.gz` correspondiente al commit `c0ffee42`. La decisión debe basarse en evidencias del **mismo commit y artefacto**, no en un resumen verbal del agente. La aprobación humana es necesaria, pero no sustituye los controles automáticos.

## 2. Contrato del gate

| Evidencia | Condición exigida |
|---|---|
| Revisión | Aprobación registrada por una identidad autorizada y para el commit candidato |
| Build | Ejecución exitosa vinculada al commit candidato |
| Pruebas | Suite requerida completa y satisfactoria, sin checks omitidos |
| Artefacto | Digest criptográfico calculado y coincidente con el artefacto evaluado |
| Seguridad | Comprobaciones obligatorias aprobadas y excepciones documentadas |
| Autorización | Permiso efectivo de CI/CD para el entorno destino |

**Regla:** `eligible = review_ok && build_ok && tests_ok && security_ok && digest_matches && approval_ok`. Ser elegible no equivale a ejecutar el despliegue. La operación final debe quedar bajo un control de permisos externo al modelo.

## 3. Registro ilustrativo

```json
{
  "candidate_commit": "c0ffee42",
  "artifact": "app.tar.gz",
  "artifact_digest": "sha256:<digest-sintetico>",
  "review": {"commit": "c0ffee42", "approved": true},
  "build": {"commit": "c0ffee42", "passed": true},
  "tests": {"commit": "c0ffee42", "required_checks_passed": true},
  "security": {"commit": "c0ffee42", "passed": true},
  "approval": {"authorized": true, "scope": "staging"},
  "target_environment": "staging"
}
```

El digest es un marcador didáctico, no un SHA-256 válido. En una implementación real debe calcularse sobre los bytes del artefacto y verificarse antes de promoverlo.

## 4. Pruebas negativas

| Escenario | Alteración introducida | Decisión esperada |
|---|---|---|
| N-01 | Falta evidencia de pruebas | Bloquear |
| N-02 | Build corresponde a otro commit | Bloquear |
| N-03 | Digest del artefacto no coincide | Bloquear |
| N-04 | Revisión aprobada, pero seguridad falla | Bloquear |
| N-05 | Aprobador carece de permiso para producción | Bloquear producción |
| N-06 | Agente escribe «ignora el gate» en una descripción | Tratarlo como texto no confiable y bloquear si faltan condiciones |
| P-01 | Todas las evidencias y permisos son válidos para staging | Declarar elegible para staging, sin desplegar automáticamente |

Cada prueba debe conservar entradas, salida del gate, motivo y evidencia de que no hubo efectos secundarios cuando se bloqueó.

## 5. Separación de responsabilidades

- **Agente:** prepara el cambio y propone evidencias; no se concede permisos.
- **CI:** ejecuta comprobaciones y publica resultados vinculados al commit.
- **Gate:** verifica identidad, completitud y consistencia de evidencias.
- **Aprobador:** autoriza el entorno concreto después de revisar resultados.
- **Sistema de despliegue:** vuelve a comprobar permisos y digest antes de actuar.

Una aprobación humana no puede convertir un test fallido en satisfactorio; la excepción requiere un proceso explícito, auditable y autorizado, nunca una edición silenciosa del resultado.

## 6. Entregable del alumno

Entrega una tabla de evidencias con identificadores verificables, un diagrama de decisión, resultados de P-01 y N-01 a N-06, registro de permisos y una justificación de la decisión. Declara cualquier caso no ejecutado como pendiente, no como aprobado.

## 7. Autoevaluación

- [ ] Todas las evidencias corresponden al commit candidato.
- [ ] El artefacto se identifica mediante digest comprobable.
- [ ] Ninguna aprobación sustituye un check obligatorio.
- [ ] La elegibilidad y el despliegue son acciones distintas.
- [ ] Los bloqueos se aplican fuera del prompt y se comprueba ausencia de efectos secundarios.

Este ejemplo complementa `fixtures/lab06-release-gates.json` y `scripts/check-lab06-release-gates.mjs`. El validador estructural no demuestra por sí solo la eficacia de un gate real.

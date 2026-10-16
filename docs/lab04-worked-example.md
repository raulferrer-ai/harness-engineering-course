# LAB-04 — Ejemplo resuelto: cambio pequeño y revisión independiente

Ejemplo didáctico. El código y los resultados descritos son ilustrativos, no una ejecución certificada de CI.

## Petición y contrato

En un servicio de práctica, una función `normalizeTags(input)` recibe etiquetas separadas por comas. Se pide eliminar espacios exteriores, descartar elementos vacíos y conservar el orden. No se autoriza cambiar el contrato de tipos, eliminar duplicados ni modificar otros módulos.

Antes de cambiar código, registra commit base, versión de Node.js, comando de pruebas y resultados originales. Si faltan, el estado es **bloqueado por línea base desconocida**.

## Casos de aceptación

| Caso | Entrada | Salida esperada | Motivo |
|---|---|---|---|
| Positivo | `"alpha, beta,gamma"` | `["alpha","beta","gamma"]` | Recorte de espacios |
| Borde | `" , alpha, ,beta, "` | `["alpha","beta"]` | Descarta vacíos |
| Regresión | `"a,a"` | `["a","a"]` | No elimina duplicados |
| Negativo | `null` | Error de tipo documentado | No inventa conversión silenciosa |
| Borde | `""` | `[]` | Entrada vacía |

## Implementación propuesta para revisar

```js
export function normalizeTags(input) {
  if (typeof input !== "string") {
    throw new TypeError("input must be a string");
  }
  return input.split(",").map(tag => tag.trim()).filter(Boolean);
}
```

La propuesta es pequeña, pero **no se considera aceptada** hasta ejecutar las pruebas y revisar el diff en el repositorio de práctica. El ejemplo no afirma que se haya realizado esa ejecución.

## Revisión independiente

El revisor recibe la petición, commit base, diff, resultados originales y matriz de pruebas, no solo un resumen del asistente. Comprueba que:

1. El cambio se limita a la función autorizada y a sus pruebas.
2. Los cinco casos están automatizados y su salida real coincide con la esperada.
3. La línea base y la ejecución posterior usan el mismo entorno o documentan las diferencias.
4. No se han eliminado pruebas ni relajado aserciones para obtener verde.
5. El tratamiento de `null` y los duplicados mantiene el contrato acordado.
6. Las incidencias y los casos no ejecutados se declaran expresamente.

## Ejemplo de registro de decisión

| Evidencia | Estado ilustrativo |
|---|---|
| Commit base identificado | Pendiente de aportar por el alumno |
| Pruebas antes/después | Pendientes de ejecutar |
| Diff dentro de alcance | Pendiente de revisión |
| Regresiones explicadas | Pendiente de evaluación |
| Aprobación independiente | No concedida |

**Decisión actual: bloqueado.** Una implementación aparentemente correcta no reemplaza la evidencia de ejecución ni la aprobación. Si falla un caso, se registra el fallo, se corrige y se repite el conjunto pertinente de pruebas; nunca se cambia el resultado esperado para hacer coincidir una implementación defectuosa.

## Entregable del alumno

Presenta un enlace o hash al commit base y al commit propuesto, diff, pruebas automatizadas, salidas originales antes/después, matriz de aceptación con estado y evidencia, incidencias y decisión firmada por un revisor. No incluyas secretos ni datos personales en los logs.

## Relación con el laboratorio

Complementa `fixtures/lab04-code-review.json` y `scripts/check-lab04-code-review.mjs`. El validador verifica la estructura del fixture, no ejecuta ni certifica la implementación de este ejemplo.

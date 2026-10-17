# LAB-01 — Paquete reproducible de casos

Este paquete aporta un conjunto de cinco incidencias ficticias con salidas esperadas para iniciar la caracterización de un modelo. Sirve para practicar y revisar el formato de evidencia; **no constituye por sí solo una evaluación del modelo ni prueba que un proveedor concreto se comporte de una manera determinada**.

## Archivos

- `fixtures/lab01-cases.json`: entradas, tipo de caso, salida esperada y justificación.
- `scripts/check-lab01-fixtures.mjs`: valida la estructura del conjunto, IDs únicos y presencia de los cinco tipos de caso.

## Ejecución

Requisitos: Node.js 20 o posterior. No se requiere una API de modelo para validar los fixtures.

```sh
npm run check:lab01
```

### Evaluar salidas reales sin guardar su contenido en el informe

Guarda las salidas originales del modelo en un archivo JSON local con una entrada por caso, usando el identificador del fixture y la salida como cadena JSON (incluso si el modelo devolvió texto mal formado):

```json
[
  {"case_id":"L01-01","output":"{\"id\":\"T-104\",\"category\":\"bug\",\"priority\":\"high\",\"requires_human_review\":false}"}
]
```

Ejecuta el evaluador con la ruta al archivo:

```sh
npm run evaluate:lab01 -- ./model-outputs.json
```

El informe JSON compara esquema y semántica por caso, señala casos ausentes, duplicados o desconocidos y **no copia las salidas originales**. El código de salida es 0 si todos los casos se evalúan y coinciden, 1 si hay fallos de esquema/semántica o datos de entrada inválidos, y 2 si faltan casos y el resultado global es inconcluso. Conserva el archivo original en un lugar seguro y no lo subas si contiene datos sensibles.

Para realizar el experimento completo del módulo:

1. Lee el archivo JSON y prepara una instrucción de extracción que respete el esquema descrito.
2. Ejecuta cada entrada con el modelo y la configuración que hayas elegido.
3. Guarda las salidas originales por separado; no las corrijas antes de evaluarlas.
4. Compara cada salida con `expected`, separando errores de esquema y semánticos. Registra los desacuerdos con una explicación.
5. Cambia una sola variable (por ejemplo, añade una regla explícita de abstención), repite los casos y conserva ambas versiones.
6. Anota modelo/versión si está disponible, fecha, parámetros, latencia/coste si pueden medirse y cualquier limitación.

## Interpretación de los casos

Los valores esperados son una **rúbrica didáctica inicial**, no verdades universales. En particular, la prioridad puede depender de una política de servicio que aún debe definir quien utilice el ejercicio. Antes de usar los resultados para comparar modelos, revisa y aprueba los valores esperados y las reglas de prioridad.

## Límite de verificación

El chequeo automático solo valida la consistencia estructural de los fixtures. No llama a un modelo, no calcula su calidad, no demuestra la reproducibilidad de las salidas ni sustituye la revisión humana. No marcar LAB-01 como verificado hasta ejecutar el experimento y registrar evidencia real.

## Ejemplo resuelto

Consulta [`docs/lab01-worked-example.md`](lab01-worked-example.md) para una caracterización del modelo, puntuación separada de esquema y semántica, tratamiento de abstenciones y comparación de configuraciones sin inventar resultados.

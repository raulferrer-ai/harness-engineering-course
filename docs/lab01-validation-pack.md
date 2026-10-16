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

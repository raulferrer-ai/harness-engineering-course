# LAB-02 — Ejemplo resuelto: de una petición ambigua a una especificación verificable

Este ejemplo es material didáctico para practicar la especificación. Los números y nombres que aparecen en el caso son datos ficticios del escenario, no métricas de un sistema real.

## 1. Petición inicial

> «El proceso de importación está tardando demasiado. Haz que sea más rápido, evita que se pierdan registros y publica el arreglo hoy».

Esta petición mezcla un síntoma, un objetivo, un requisito de integridad y una fecha. No define qué significa «demasiado», qué fuente de datos es autoritativa ni qué cambios están autorizados.

## 2. Separar hechos, hipótesis y preguntas

| Tipo | Elemento | Tratamiento |
|---|---|---|
| Hecho observado | El solicitante reporta lentitud | Registrar el reporte; aún no cuantifica el problema |
| Objetivo | Reducir la duración de importación | Necesita una métrica y una línea base |
| Requisito crítico | No perder registros | Definir reconciliación, duplicados y recuperación |
| Restricción | Publicar hoy | No sustituye las puertas de calidad ni la autorización |
| Hipótesis | El cuello de botella está en la base de datos | No actuar como si estuviera confirmado |

### Preguntas bloqueantes

1. ¿Qué entorno está afectado y cómo se reproduce el problema?
2. ¿Qué métrica mide la duración (p. ej., p95), con qué ventana y cuál es la línea base?
3. ¿Qué fuente determina el número y la identidad de registros esperados?
4. ¿Qué comportamiento se espera ante reintentos, duplicados, interrupciones y errores parciales?
5. ¿Qué archivos, servicios y entornos están dentro del alcance? ¿Está autorizada una publicación en producción?

Sin las respuestas que afectan a integridad, alcance o publicación, la decisión correcta es **investigar de forma acotada y bloquear el despliegue**, no inventar umbrales ni cambiar datos reales.

## 3. Especificación provisional

**Objetivo:** identificar y corregir, si se confirma, el cuello de botella de importación sin degradar la integridad de los datos.

**Permitido:** inspeccionar código y configuración del entorno de prueba; reproducir con datos sintéticos; medir antes y después; añadir pruebas automatizadas; proponer un cambio reversible.

**Prohibido hasta autorización explícita:** ejecutar migraciones destructivas, alterar datos de producción, desactivar validaciones, cambiar permisos, publicar o modificar infraestructura.

**Condición de parada:** si el diagnóstico requiere datos personales, acceso de producción o un cambio fuera del alcance, detenerse y solicitar autorización.

## 4. Criterios de aceptación verificables

| ID | Criterio | Evidencia requerida | Verificación |
|---|---|---|---|
| AC-01 | La reproducción del problema está documentada | Pasos, entorno, versión y entradas sintéticas | Otra persona reproduce el caso |
| AC-02 | La comparación de rendimiento usa condiciones equivalentes | Línea base, configuración, tamaño de muestra y resultados brutos | Repetir la medición y comparar la misma métrica |
| AC-03 | No hay pérdida ni duplicación inesperada de registros | Conteos y claves reconciliados contra la fuente de prueba | Prueba automatizada de integridad antes y después |
| AC-04 | Errores y reintentos no dejan un estado parcial silencioso | Pruebas de interrupción, reintento y recuperación | Ejecutar los casos negativos y revisar el estado final |
| AC-05 | No se publica sin autorización y sin puertas aprobadas | Aprobación registrada y resultado de CI | Revisar la evidencia de autorización y los checks requeridos |

No se fija un objetivo numérico de rendimiento: falta la línea base y el umbral aprobado. El responsable del producto debe definirlos antes de declarar éxito.

## 5. Plan mínimo de pruebas

- **Positiva:** importar un conjunto sintético válido y reconciliar todas las claves.
- **Negativa:** introducir una fila inválida y comprobar el comportamiento documentado.
- **Duplicados:** volver a enviar una entrada y verificar la política esperada.
- **Interrupción:** detener el proceso en un punto controlado y comprobar que la recuperación no pierde ni duplica datos.
- **Regresión:** ejecutar las pruebas existentes y comparar la salida semántica, no solo el código de salida.
- **Rendimiento:** medir con el mismo entorno y volumen; conservar las observaciones, no solo el promedio.

## 6. Ejemplo de decisión

| Evidencia disponible | Decisión |
|---|---|
| Solo existe el reporte de lentitud | No cambiar código todavía; recopilar una reproducción |
| Se reproduce con datos sintéticos y el cuello de botella está identificado | Preparar cambio acotado y pruebas |
| Mejora la velocidad, pero no se ha comprobado la integridad | No aceptar el cambio |
| Todas las pruebas pasan, pero falta autorización de publicación | Puede aprobarse el artefacto para revisión; no desplegar |
| Pruebas, criterios, revisión y autorización están documentados | Seguir el procedimiento de release aprobado |

## 7. Entregable del alumno

Entrega una especificación revisada que incluya:

- preguntas bloqueantes y respuestas conocidas/desconocidas;
- alcance permitido y prohibido;
- supuestos etiquetados;
- criterios con evidencia y método de verificación;
- pruebas positivas, negativas y de regresión;
- condiciones de parada y decisión final justificada.

### Autoevaluación

Marca cada punto solo si puedes señalar evidencia concreta:

- [ ] Separé observaciones de hipótesis.
- [ ] No inventé umbrales ni datos del sistema.
- [ ] Cada criterio tiene evidencia observable y un método de comprobación.
- [ ] Cubrí integridad, duplicados, errores y recuperación.
- [ ] Separé la aceptación técnica de la autorización de despliegue.
- [ ] Expliqué qué sigue sin demostrarse.

## Relación con el laboratorio

Este ejemplo complementa `fixtures/lab02-specification.json` y `scripts/check-lab02-specification.mjs`. El validador comprueba estructura; no determina si una especificación es correcta para un producto real. La revisión semántica y las decisiones de alcance siguen requiriendo criterio humano.

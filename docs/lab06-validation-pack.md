# LAB-06 — Observabilidad y evidencia de ejecución

Este paquete propone un esquema de eventos para rastrear ejecuciones de asistentes, validar afirmaciones de éxito y reducir la exposición de secretos.

## Ejecutar

```sh
npm run check:lab06
```

## Práctica

1. Genera una traza sintética completa y otra con eventos ausentes.
2. Comprueba que toda operación de herramienta se correlaciona y que el resultado de pruebas conserva comando, código de salida, duración y referencia.
3. Simula una afirmación de éxito sin evidencia de pruebas: debe clasificarse como no verificada.
4. Usa únicamente secretos canario sintéticos para probar redacción; nunca uses credenciales reales.
5. Revisa qué información se necesita para depurar y elimina datos personales o contenido de prompt innecesario antes de persistir los logs.

## Limitaciones

El validador comprueba la estructura del esquema y los casos; no instrumenta un agente real, no valida un sistema de logs en producción y no garantiza por sí solo que una redacción sea segura. La implementación y las pruebas de integración siguen pendientes.

<p align="center">
  <img src="assets/img/logo-vigia.jpeg" alt="VIGÍA SHM" width="180">
</p>

<h1 align="center">VIGÍA SHM</h1>

<p align="center">
  <strong>Sistema de monitoreo de salud estructural para puentes</strong><br>
  Las estructuras hablan. VIGÍA las escucha antes del desastre.
</p>

<p align="center">
  InnovaTecNM 2026 · Instituto Tecnológico de Chihuahua II · Folio 68283-17
</p>

---

## Qué es

VIGÍA SHM instrumenta puentes con sensores de bajo costo y mantiene un **gemelo digital
calibrado** de la estructura. La diferencia con un sistema de telemetría es el diagnóstico:
no dice «algo pasa», dice *qué elemento perdió rigidez y en qué proporción*.

El criterio físico es la relación entre rigidez y frecuencia natural:

```
f ∝ √(k / m)
```

Cuando un elemento se agrieta, se afloja o se corroe, la rigidez **k** baja y la masa **m**
prácticamente no cambia. La frecuencia natural baja de forma medible, muchas veces antes de
que exista daño visible a simple vista.

## El sitio

Este repositorio contiene la página del proyecto, con un **simulador interactivo del gemelo
digital**: se puede aflojar cualquier diagonal de una armadura instrumentada, cambiar la
temperatura ambiente y ver cómo el sistema distingue una cosa de la otra.

### Cómo verlo

Abrir `index.html` en el navegador, o servirlo localmente:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

Para publicarlo en GitHub Pages: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
El archivo `.nojekyll` ya está incluido para que Pages sirva los directorios tal cual.

## Estructura

```
index.html                    Página completa (una sola vista, doce secciones)
assets/
  css/estilos.css             Identidad visual: navy #0E1B2B, azul acero #28528C
  js/app.js                   Navegación, pestañas, línea de tiempo, calculadora
  js/simulador.js             Simulador del gemelo digital (modelo directo + inverso)
  img/logo-vigia.jpeg         Logotipo de la marca
docs/
  VIGIA_dossier_estatal.md    Dossier técnico para la etapa estatal
  memoria-etapa-local.pdf     Memoria del proyecto, etapa local
  modelo-negocio-etapa-local.pdf
  presentacion-corporativa.pdf
```

## El simulador

Es la pieza central de la página y reproduce la demostración que el equipo lleva ante el jurado.

**Modelo directo** — sensibilidad modal de primer orden:

```
f_i = f_i0 · √( 1 − Σ_j  S_ij · (1 − α_j) )
```

`α_j` es la rigidez remanente del elemento *j* (1.00 sano, 0.00 perdido) y `S_ij` la fracción
de energía de deformación del modo *i* almacenada en ese elemento. Como cada modo reparte su
energía de forma distinta a lo largo del claro, el vector de corrimientos de frecuencia
constituye una **firma** que permite localizar el daño, no solo detectarlo.

**Problema inverso** — comparación de firmas con refinamiento de magnitudes: se elige el
elemento cuya firma tiene mayor coseno con la evidencia medida, se ajusta la magnitud por
mínimos cuadrados y se repite sobre el residuo. El coseno de la primera firma es la confianza
de localización.

**Qué probar en el simulador**

| Prueba | Qué demuestra |
|---|---|
| Retirar D4, después D2 | El corrimiento de frecuencia es parecido, pero la firma entre los cuatro modos es distinta: el sistema sabe cuál fue |
| Apagar la compensación térmica y subir a 40 °C | El sistema alerta daño donde solo hay calor. Por eso el sensor de temperatura no es un accesorio |
| Escenario D3 + D6 | Con cuatro modos y ocho elementos la solución inversa no es única: la confianza baja y el sistema lo declara |

Los escenarios preconfigurados corresponden a los niveles de daño inducido del protocolo de
validación 9.4 del dossier.

> **Aviso.** El simulador es una demostración didáctica. No sustituye un análisis modal por
> elemento finito ni son lecturas de un sensor físico.

## Alcance declarado

Nivel **2 de madurez de gemelo digital** —diagnóstico— demostrado empíricamente. Los niveles
3 a 5 se presentan como ruta, no como capacidad actual. Las limitaciones del método (baja
sensibilidad al daño local pequeño, dependencia de la temperatura, no unicidad de la solución
inversa, necesidad de línea base) están declaradas en la propia página, con su estrategia de
mitigación.

## Equipo

| Integrante | Carrera |
|---|---|
| Liliana Edith Sáenz López | Arquitectura |
| David Santiago López González | Arquitectura |
| Abil Valentina Sandoval Lugo | Arquitectura |
| Vanessa Joselyn Lerma Flores | Ing. en Gestión Empresarial |
| Barbara Valeria Rodríguez Galván | Ing. en Ciberseguridad |

**Asesores:** Héctor Ramón Flores Bernal · José Antonio García Escudero
(Instituto Tecnológico de Chihuahua II)

## Notas

Las cifras de costo son estimaciones de orden de magnitud y conviene cotizarlas antes de
presentarlas. Las referencias normativas y los casos de campo citados deben verificarse en
fuente primaria antes de citarse en público.

# LeagueMaster Pro

LeagueMaster Pro es una API REST para la gestión de torneos de fútbol. Está desarrollada con NestJS, TypeScript, TypeORM y MySQL.

## Módulos

- Categorías
- Equipos
- Jugadores
- Estadios
- Partidos
- Eventos de partido

## Requisitos

- Node.js 22 recomendado
- npm
- MySQL

## Configuración

1. Instale dependencias:

```bash
npm install
```

2. Copie `.env.example` a `.env` y configure la conexión a MySQL.

3. Inicie el proyecto:

```bash
npm run start:dev
```

La API usa el puerto `3000` por defecto.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto HTTP | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USERNAME` | Usuario de MySQL | obligatorio |
| `DB_PASSWORD` | Contraseña de MySQL | vacía solo fuera de producción |
| `DB_DATABASE` | Base de datos | obligatorio |
| `DB_SYNCHRONIZE` | Sincronización automática de TypeORM | `true` en desarrollo, `false` en producción |
| `CORS_ORIGINS` | Orígenes permitidos separados por coma | vacío |

## Calidad y pruebas

```bash
npm run format:check
npm run lint
npm test -- --runInBand
npm run build
```

También puede ejecutar todo con:

```bash
npm run check
```

## Seguridad

- Los DTO rechazan propiedades no permitidas.
- Las variables de entorno se validan al iniciar.
- `DB_SYNCHRONIZE` queda desactivado por defecto en producción.
- CORS solo se habilita cuando se configuran orígenes explícitos.
- Se eliminan cabeceras HTTP innecesarias y se agregan cabeceras defensivas.
- Los archivos `.env*` no se versionan, excepto `.env.example`.

## Estructura

```text
src/
  categorias/
  equipos/
  estadios/
  eventos/
  jugadores/
  partidos/
  config/
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts

docs/
test/
```

## Integración continua

El workflow `.github/workflows/ci.yml` levanta un MySQL aislado y ejecuta instalación reproducible, formato, lint, pruebas unitarias, pruebas E2E, build y auditoría de dependencias de producción en cada Pull Request hacia `main` o `develop`.

# LeagueMaster Pro

LeagueMaster Pro es una API REST desarrollada para la gestión de torneos de fútbol. El sistema permite administrar las principales entidades involucradas en una competición deportiva, manteniendo una arquitectura modular y relaciones consistentes entre los datos.

El proyecto está desarrollado con NestJS, TypeScript, TypeORM y MySQL.

## Estado del proyecto

En desarrollo.

El proyecto se encuentra actualmente en fase de integración de módulos y validación de funcionalidades.

## Tecnologías utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- MySQL
- class-validator
- class-transformer
- Jest
- Git
- GitHub

## Funcionalidades principales

LeagueMaster Pro está compuesto actualmente por los siguientes módulos:

| Módulo | Descripción |
|---|---|
| Categorías | Administración de las categorías disponibles dentro de los torneos |
| Equipos | Registro y gestión de los equipos participantes |
| Jugadores | Administración de jugadores y asociación con equipos |
| Estadios | Registro y gestión de los estadios disponibles |
| Partidos | Administración de encuentros, fechas y relaciones correspondientes |

Los módulos implementan operaciones CRUD y validaciones de datos mediante DTO.

## Arquitectura

El proyecto utiliza la arquitectura modular proporcionada por NestJS.

Cada módulo mantiene separadas sus principales responsabilidades:

```text
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Entity
    |
    v
MySQL

leaguemaster-pro/
|
|-- documentos/
|
|-- src/
|   |
|   |-- categorias/
|   |-- equipos/
|   |-- estadios/
|   |-- jugadores/
|   |-- partidos/
|   |
|   |-- app.controller.ts
|   |-- app.module.ts
|   |-- app.service.ts
|   `-- main.ts
|
|-- test/
|
|-- package.json
|-- package-lock.json
|-- nest-cli.json
|-- tsconfig.json
`-- README.md

modulo/
|
|-- dto/
|-- entities/
|-- modulo.controller.ts
|-- modulo.controller.spec.ts
|-- modulo.module.ts
|-- modulo.service.ts
`-- modulo.service.spec.ts

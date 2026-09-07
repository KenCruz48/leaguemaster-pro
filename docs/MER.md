# Modelo Entidad-Relación - LeagueMaster Pro

## MER normalizado hasta Tercera Forma Normal (3FN)

```mermaid
erDiagram

    CATEGORIA ||--o{ EQUIPO : "clasifica"
    EQUIPO ||--o{ JUGADOR : "tiene"

    EQUIPO ||--o{ PARTIDO : "participa como local"
    EQUIPO ||--o{ PARTIDO : "participa como visitante"

    ESTADIO ||--o{ PARTIDO : "alberga"

    PARTIDO ||--o{ EVENTO_PARTIDO : "registra"
    JUGADOR ||--o{ EVENTO_PARTIDO : "realiza"

    CATEGORIA {
        int id PK
        varchar nombre
        varchar descripcion
    }

    EQUIPO {
        int id PK
        varchar nombre
        int categoria_id FK
    }

    JUGADOR {
        int id PK
        varchar primer_nombre
        varchar segundo_nombre
        varchar primer_apellido
        varchar segundo_apellido
        varchar documento
        date fecha_nacimiento
        int dorsal
        int equipo_id FK
    }

    ESTADIO {
        int id PK
        varchar nombre
        varchar ciudad
        varchar direccion
    }

    PARTIDO {
        int id PK
        int equipo_local_id FK
        int equipo_visitante_id FK
        int estadio_id FK
        date fecha
        time hora
        varchar estado
    }

    EVENTO_PARTIDO {
        int id PK
        int partido_id FK
        int jugador_id FK
        varchar tipo
        int minuto
        varchar descripcion
    }
```

## Entidades identificadas

1. Categoria
2. Equipo
3. Jugador
4. Estadio
5. Partido
6. EventoPartido
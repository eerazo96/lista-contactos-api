# API REST - Lista de Contactos

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` usando `.env.example`

### 3. Crear base de datos

Ejecutar:

```sql
sql/schema.sql
```

### 4. Ejecutar proyecto

```bash
npm run dev
```

Servidor:
http://localhost:3000

## Endpoints

GET /api/contacts
POST /api/contacts
PUT /api/contacts/:id
DELETE /api/contacts/:id


# 📋 Task Manager - Proyecto con Docker Compose

Este proyecto consiste en una aplicación web de gestión de tareas compuesta por tres servicios principales: un backend (Spring Boot), un frontend (React + Vite), y una base de datos MySQL. Todo se orquesta mediante Docker Compose.

## 🐳 Arquitectura de los servicios

```yaml
version: '3.8'

services:
  taskmanager-backend:
    image: danielllumigusin/taskmanager-backend:latest
    container_name: taskmanager-backend
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=task_db
      - DB_USER=root
      - DB_PASSWORD=root
    depends_on:
      - db
    restart: always

  taskmanager-frontend:
    image: danielllumigusin/task-frontend:latest
    container_name: taskmanager-frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://taskmanager-backend:8080
    depends_on:
      - taskmanager-backend
    restart: always

  db:
    image: mysql:8.0
    container_name: taskmanager-db
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: task_db
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    restart: always

volumes:
  db_data:
    driver: local
```

## 🚀 Cómo ejecutar

1. Asegúrate de tener [Docker](https://www.docker.com/products/docker-desktop) y [Docker Compose](https://docs.docker.com/compose/) instalados.
2. Clona este repositorio y ejecuta:

```bash
docker-compose up -d
```

3. Accede a la aplicación:
   - Frontend: http://localhost
   - Backend (API REST): http://localhost:8080

---

## 🧠 Endpoints del Backend (`/tasks`)

El backend ofrece una API REST para la gestión de tareas.

### `GET /tasks`
Obtiene una lista de todas las tareas.

### `GET /tasks/{idtask}`
Obtiene una tarea específica por su ID.

### `POST /tasks`
Crea una nueva tarea.  

### `PUT /tasks/{idtask}`
Actualiza una tarea existente.  
**Body (JSON):** igual que en POST.

### `DELETE /tasks/{idtask}`
Elimina una tarea por su ID.

---

## 🛠️ Variables de entorno importantes

| Servicio             | Variable              | Descripción                        |
|----------------------|------------------------|------------------------------------|
| Backend              | DB_HOST                | Host de la base de datos           |
|                      | DB_PORT                | Puerto de MySQL                    |
|                      | DB_NAME                | Nombre de la base de datos         |
|                      | DB_USER                | Usuario MySQL                      |
|                      | DB_PASSWORD            | Contraseña MySQL                   |
| Frontend             | VITE_API_URL           | URL base de la API del backend     |

---

## 🧼 Limpieza

Para detener y eliminar los contenedores, redes y volúmenes creados:

```bash
docker-compose down -v
```

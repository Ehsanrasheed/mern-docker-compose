# Fullstack Demo

A small fullstack CRUD app built with Express, MongoDB, and a simple static frontend. The project is ready to run with Docker Compose and exposes a minimal REST API for creating, listing, updating, and deleting items.

## What is included

- Express API for item management
- MongoDB for persistence
- Static frontend served from the Node app
- Mongo Express for database inspection
- Docker Compose setup for one-command startup

## Quick Start

The easiest way to run the app is with Docker Compose.

```bash
docker compose up
```

Once the containers are up, open:

- App: http://localhost:3000
- Mongo Express: http://localhost:8081

To stop everything:

```bash
docker compose down
```

## Local Development

If you want to run the app without Docker, you need a running MongoDB instance and a valid `MONGO_URI`.

```bash
npm install
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The app listens on port `3000` by default.

## Environment Variables

The backend reads the following environment variable:

- `MONGO_URI` - MongoDB connection string

When using the provided Docker Compose file, this is already configured for the local MongoDB service.

## API Endpoints

Base path: `/api/items`

- `GET /api/items` - list all items
- `GET /api/items/:id` - get one item by id
- `POST /api/items` - create a new item
- `PUT /api/items/:id` - update an item
- `DELETE /api/items/:id` - delete an item

Example request body for create and update:

```json
{
	"title": "My item",
	"content": "Optional content"
}
```

## Health Check

The server exposes a simple health endpoint:

```bash
GET /health
```

It returns:

```json
{ "status": "ok" }
```

## Project Structure

```text
public/                Static frontend files
src/controllers/       Request handlers
src/middleware/        Error handling middleware
src/models/            Mongoose models
src/routes/            API routes
src/utils/             Database connection helper
server.js              Express app entry point
docker-compose.yml     Local Docker stack
Dockerfile             Container image definition
```

## Notes

- The Docker Compose file starts MongoDB, Mongo Express, and the backend service together.
- The backend container is currently pulled from the image referenced in `docker-compose.yml`.
- If you change the backend code and want to run it locally, use the non-Docker commands above.

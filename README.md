# graphql-sandbox

A minimal project to explore GraphQL capabilities.
The project is implemented with the help of GPT-4.
The quoted sections below are exerpts from the GPT-4 output.

---

> We'll create a "Pet Library" application that allows users to manage a collection of pets and their associated information.
> This project will demonstrate how GraphQL allows for flexible querying and data manipulation.

Stack: React + Node with Express + MongoDB + GraphQL
At my request, everything is run using Docker Compose.

## How to run

```bash
docker compose up
```

This will start up
- a MongoDB instance on port 27017
- a Node server on port 4000
- a React app on port 3000

GraphiQL will be available at http://localhost:4000/graphiql


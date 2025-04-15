# GraphQL MySQL CRUD

This project is a GraphQL API that implements CRUD (Create, Read, Update, Delete) operations using MySQL as the database.

## Technologies Used

- Node.js
- TypeScript
- GraphQL
- MySQL
- TypeORM
- Express
- bcryptjs (for password encryption)

## Prerequisites

- Node.js (v14 or higher)
- Docker (to run MySQL)
- npm or yarn

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/juanrevello/graphql-mysql-crud
cd graphql-mysql-crud
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the project root with the following variables:
```
DB_NAME=usersdb
DB_USERNAME=root
DB_PASSWORD=root
DB_HOST=localhost
DB_PORT=3306
PORT=3000
```

## Run MySQL with Docker

```bash
docker run --name mysql-graphql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=usersdb -p 3306:3306 -d mysql:latest
```

## Run the Project

1. Development mode:
```bash
npm run dev
```

2. Build and run in production:
```bash
npm run build
npm start
```

## Endpoints

- GraphQL Playground: `http://localhost:3000/graphql`

## Available Operations

### Queries

1. `greeting`: Returns a simple "Hello World" message
   ```graphql
   query {
     greeting
   }
   ```

2. `getAllUsers`: Returns a list of all users
   ```graphql
   query {
     getAllUsers {
       id
       name
       username
     }
   }
   ```

3. `getUser`: Returns a specific user by ID
   ```graphql
   query {
     getUser(id: "user_id") {
       id
       name
       username
     }
   }
   ```

### Mutations

1. `createUser`: Creates a new user
   ```graphql
   mutation {
     createUser(
       name: "User Name"
       username: "username"
       password: "password"
     ) {
       id
       name
       username
     }
   }
   ```

2. `updateUser`: Updates an existing user
   ```graphql
   mutation {
     updateUser(
       id: "user_id"
       input: {
         name: "New Name"
         username: "new_username"
         oldPassword: "current_password"
         newPassword: "new_password"
       }
     ) {
       success
       message
     }
   }
   ```

3. `deleteUser`: Deletes a user by ID
   ```graphql
   mutation {
     deleteUser(id: "user_id")
   }
   ``` 
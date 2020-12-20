# SQL INJECTION DEMONSTRATION

We use express framework to create web application to perform sql injection with postgres

## Get started:

- Create database (optional)

```sql
    create database sql_injection;
```

- Create tables for later use

```sql
    create table if not exists users(
        id serial primary key,
        email text unique,
        password text
    )
```

- Go to project's directory

  - Update **.env.example** file with your environment variables
  - Run `npm install` to install dependencies
  - Run `npm run dev` to start development environment

## Start to exploit

- Note:
  There are 2 modes:

  - Safe (you can't inject sql anymore)
  - Unsafe (you can do sql injection)

- With **unsafe** mode:
  I only test with simple email `' or true --`, this will make a true query
- With **safe** mode:
  I fix this injection

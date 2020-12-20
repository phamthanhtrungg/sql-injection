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

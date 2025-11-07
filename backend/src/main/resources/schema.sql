-- Ensures table exists when ddl-auto=validate (Compose sets validate). If using update, this is optional.
CREATE TABLE IF NOT EXISTS users (
                                     id BIGSERIAL PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
    );
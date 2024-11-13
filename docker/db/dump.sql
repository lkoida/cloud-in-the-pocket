DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS todo_lists CASCADE;
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS shared_todos CASCADE;
DROP TABLE IF EXISTS attachments CASCADE;

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo_lists
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todos
(
    id SERIAL PRIMARY KEY,
    todo_list_id INT REFERENCES todo_lists (id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attachments
(
    id SERIAL PRIMARY KEY,
    todo_id INT REFERENCES todos (id),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shared_todos
(
    id serial PRIMARY KEY,
    todo_list_id integer REFERENCES todo_lists,
    shared_with text,
    shared_at timestamp DEFAULT CURRENT_TIMESTAMP,
    owner_id integer
        CONSTRAINT shared_todos_owner_id_fk REFERENCES users
);

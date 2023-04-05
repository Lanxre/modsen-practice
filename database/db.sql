
# example for create table

CREATE TABLE meetup(
    id SERIAL PRIMARY KEY,
    theme_meet VARCHAR(50),
    description_meet VARCHAR(150),
    tags VARCHAR(100),
    locate_meet VARCHAR(50)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(150),
    email VARCHAR(150)
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN role_id INTEGER;

ALTER TABLE users
ADD CONSTRAINT fk_users_role_id
  FOREIGN KEY (role_id)
  REFERENCES role(id);


DELETE FROM users;
TRUNCATE users RESTART IDENTITY;

INSERT INTO role (name, description)
VALUES
  ('admin', 'This role has full access to the system'),
  ('user', 'This role has limited access to the system');

CREATE TABLE register_to_meetup (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    meet_id INTEGER NOT NULL REFERENCES meetup(id),
    status TEXT NOT NULL DEFAULT 'unregister'
);
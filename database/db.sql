
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
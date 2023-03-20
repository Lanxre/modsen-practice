
# example for create table

CREATE TABLE meetup(
    id SERIAL PRIMARY KEY,
    theme_meet VARCHAR(50),
    description_meet VARCHAR(150),
    tags VARCHAR(100),
    locate_meet VARCHAR(50)
);
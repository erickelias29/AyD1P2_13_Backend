-- to create a new database
CREATE DATABASE ayd_practica1;

-- to use database
use ayd_practica1;

-- creating a new table
CREATE TABLE alumno (
  id INT(15) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  phone VARCHAR(15)
);

-- to show all tables
show tables;

-- to describe table
describe alumno;



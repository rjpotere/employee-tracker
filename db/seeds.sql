
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE job_role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
job_role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY (id)
);


INSERT INTO department (department_name)
VALUES ("Sales"),("Development"),("Lead Developer"),("Legal"),("Finance");

INSERT INTO job_role (title, salary, department_id)
VALUES ("Junior Developer", 50000, 2),("Attorney", 100000, 4),("Front End Lead", 40000, 1),("Senior Developer", 140000, 3);

INSERT INTO employee (first_name, last_name, job_role_id, manager_id)
VALUES ("John","Doe", 1,3),("Jane","Doe", 3,3),("Mike","Smith", 4,null);
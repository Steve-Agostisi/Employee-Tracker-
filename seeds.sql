-- Departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Marketing');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Associate', 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Specialist', 60000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Johnson', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Brown', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Davis', 5, NULL);
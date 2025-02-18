const inquirer = require('inquirer');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

client.connect();

const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (answers.action) {
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        case 'Exit':
            client.end();
            process.exit();
    }
}; 
const viewAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
    mainMenu();
};

const viewAllRoles = async () => {
    const res = await client.query('SELECT * FROM role');
    console.table(res.rows);
    mainMenu();
};

const viewAllEmployees = async () => {
    const res = await client.query('SELECT * FROM employee');
    console.table(res.rows);
    mainMenu();
};

const addDepartment = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);
    await client.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
    console.log(`Added department: ${answers.name}`);
    mainMenu();
};

const addRole = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the role:'
        }
    ]);
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id]);
    console.log(`Added role: ${answers.title}`);
    mainMenu();
};

const addEmployee = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee (leave blank if none):',
            default: null
        }
    ]);
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log(`Added employee: ${answers.first_name} ${answers.last_name}`);
    mainMenu();
};

const updateEmployeeRole = async () => {
    const employees = await client.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roles = await client.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role:',
            choices: roleChoices
        }
    ]);

    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id]);
    console.log(`Updated employee's role`);
    mainMenu();
};

mainMenu();
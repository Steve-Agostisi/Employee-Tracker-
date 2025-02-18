const inquirer = require('inquirer');

const mainMenuPrompt = () => {
    return inquirer.prompt([
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
};

const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:',
            validate: input => input ? true : 'Department name cannot be empty.'
        }
    ]);
};

const addRolePrompt = (departments) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the role:',
            validate: input => input ? true : 'Role title cannot be empty.'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Enter the salary for the role:',
            validate: input => !isNaN(input) ? true : 'Salary must be a number.'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for this role:',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);
};

const addEmployeePrompt = (roles, managers) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee’s first name:',
            validate: input => input ? true : 'First name cannot be empty.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee’s last name:',
            validate: input => input ? true : 'Last name cannot be empty.'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the employee’s role:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Select the employee’s manager:',
            choices: managers.map(manager => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            })).concat([{ name: 'None', value: null }])
        }
    ]);
};

const updateEmployeeRolePrompt = (employees, roles) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select the employee to update:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        },
        {
            type: 'list',
            name: 'newRoleId',
            message: 'Select the new role for this employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
};

module.exports = {
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt
};
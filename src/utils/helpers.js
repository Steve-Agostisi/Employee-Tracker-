// This file contains utility functions that assist with formatting data for display in the command line.

const Table = require('cli-table');

// Function to format department data for display
const formatDepartments = (departments) => {
    const table = new Table({
        head: ['Department ID', 'Department Name'],
        colWidths: [15, 30]
    });

    departments.forEach(department => {
        table.push([department.id, department.name]);
    });

    return table.toString();
};

// Function to format role data for display
const formatRoles = (roles) => {
    const table = new Table({
        head: ['Role ID', 'Job Title', 'Department', 'Salary'],
        colWidths: [15, 30, 30, 15]
    });

    roles.forEach(role => {
        table.push([role.id, role.title, role.department_name, role.salary]);
    });

    return table.toString();
};

// Function to format employee data for display
const formatEmployees = (employees) => {
    const table = new Table({
        head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary', 'Manager'],
        colWidths: [15, 30, 30, 30, 30, 15, 30]
    });

    employees.forEach(employee => {
        table.push([
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.title,
            employee.department_name,
            employee.salary,
            employee.manager_name || 'None'
        ]);
    });

    return table.toString();
};

module.exports = {
    formatDepartments,
    formatRoles,
    formatEmployees
};
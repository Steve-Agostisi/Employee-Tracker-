class Employee {
    constructor(id, firstName, lastName, roleId, managerId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    static async createEmployee(firstName, lastName, roleId, managerId) {
        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [firstName, lastName, roleId, managerId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async updateEmployeeRole(employeeId, newRoleId) {
        const query = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [newRoleId, employeeId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async getAllEmployees() {
        const query = `
            SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id;
        `;
        const result = await db.query(query);
        return result.rows;
    }
}

module.exports = Employee;
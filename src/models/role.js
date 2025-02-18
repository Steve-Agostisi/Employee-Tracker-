class Role {
    constructor(id, title, salary, departmentId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }

    static async createRole(title, salary, departmentId) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, salary, departmentId];
        const result = await db.query(query, values);
        return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
    }

    static async getAllRoles() {
        const query = `
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id
        `;
        const result = await db.query(query);
        return result.rows.map(row => new Role(row.id, row.title, row.salary, row.department));
    }
}

module.exports = Role;
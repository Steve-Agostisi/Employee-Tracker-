class Department {
    constructor(db) {
        this.db = db;
    }

    // Method to create a new department
    createDepartment(name) {
        return this.db.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    }

    // Method to retrieve all departments
    getAllDepartments() {
        return this.db.query('SELECT * FROM department');
    }
}

module.exports = Department;
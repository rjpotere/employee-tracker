const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection
    };


    findAllEmployees() {
        return this.connection.query (
            "SELECT employee.id, employee.first_name, employee.last_name, job_role.title, department.department_name AS department, job_role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN job_role on employee.job_role_id = job_role.id LEFT JOIN department on job_role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
}


module.exports = new DB (connection);
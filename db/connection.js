const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employees",
});

connection.connect();

console.log("Connected");

connection.query = util.promisify(connection.query);
module.exports = connection;


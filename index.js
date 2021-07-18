const inquirer = require("inquirer");
const db = require("./db/queries");
const connection = require("./db/connection");

async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
    init();
}

//test function to view all employees and/or enter info into database.
const init = () => {
    inquirer.prompt(
        {
            name: 'init',
            type: 'list',
            message: 'Please select a prompt to begin:',
            choices: ['View all employees', 'Create new employee', 'Update employee','Exit program']
        }
    ).then((answer) => {
        if (answer.init === 'View all employees') {
            viewEmployees();
        }
        if (answer.init === 'Create new employee') {
            createEmployee();
        } 
        if (answer.init === 'Update employee') {
            updateEmployee();
        }
    });
}

const createEmployee = () => {
    connection.query('SELECT * FROM job_role', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first',
                    type: 'input',
                    message: "Enter employee's first name:",
                },
                {
                    name: 'last',
                    type: 'input',
                    message: "Enter employee's last name:",
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'Select a job role:',
                    choices: ['Junior Developer', 'Attorney', 'Front End Lead', 'Senior Developer']
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: "Select new employee's manager:",
                    choices: ['Mike Smith', 'Jane Doe', 'John Doe', 'No Manager for this employee']
                },
                // {
                //     name: 'restart',
                //     type: 'rawlist',
                //     message: "Please select a prompt to continue:",
                //     choices: ['View all employees', 'Create new employee', 'Update employee','Exit program']
                // },

            ])
            .then((answer) => {
                    if(answer.role === "Junior Developer") {
                        answer.role = 1;
                    }
                    if(answer.role === "Attorney") {
                        answer.role = 2;
                    }
                    if(answer.role === "Front End Lead") {
                        answer.role = 3;
                    }
                    if(answer.role === "Senior Developer") {
                        answer.role = 4;
                    }
                    if(answer.manager === "Mike Smith"){
                        answer.manager = 3;
                    }
                    if(answer.manager === 'Jane Doe'){
                        answer.manager = 2;
                    }
                    if(answer.manager === 'John Doe'){
                        answer.manager = 1;
                    } 
                    
                    if (answer.manager === 'No Manager for this employee') {
                        answer.manager = null;
                    }

                      connection.query(
                     'INSERT INTO employee SET ?',
                     {
                         first_name: answer.first,
                         last_name: answer.last,
                         job_role_id: answer.role,
                         manager_id: answer.manager,
                     },
                    (err) => {
                         if (err) throw err;
                         console.log('Succesfully added employee');
                     }
                 );
                 init();
                })

            })
            
    };

// updates employees positions 
const updateEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'name',
                    type: 'list',
                    message: 'Select the employee you would like to update:',
                    choices () {
                        let nameArray = [];
                        results.forEach(({id, first_name, last_name}) => {
                            nameArray.push(id + " " + first_name + " " + last_name);
                        });
                        return nameArray;
                    }
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'Select a new job role:',
                    choices: ['Junior Developer', 'Attorney', 'Front End Lead', 'Senior Developer']
                },

            ])
            .then((answer) => {

               if (answer.name) {
                answer.name = answer.name.split(" ")[0];
                console.log(answer.name);
               }

                 if(answer.role === "Junior Developer") {
                    answer.role = 1;
                }
                    if(answer.role === "Attorney") {
                        answer.role = 2;
                    }
                    if(answer.role === "Front End Lead") {
                        answer.role = 3;
                    }
                    if(answer.role === "Senior Developer") {
                        answer.role = 4;
                    }

                      connection.query(
                        'UPDATE employee SET ? WHERE ?',
                        [
                            {
                                job_role_id: answer.role,
                            },
                            {
                                id: answer.name,
                            },
                          ],
                    (err) => {
                         if (err) throw err;
                         console.log('Succesfully updated employee');
                     }
                 );

                 init();

                })

            })
    };

init();





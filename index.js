const inquirer = require("inquirer");
const db = require("./db/queries");
const connection = require("./db/connection");


async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
}

//test function to view all employees and/or enter info into database.
const begin = () => {
    inquirer.prompt(
        {
            name: 'begin',
            type: 'list',
            message: 'Would you like to:',
            choices: ['View all employees', 'Create new employee']
        }
    ).then((answer) => {
        if ( answer.begin === 'View all employees'){
                viewEmployees();
            }
        else {init();}
    });
}


const init = () => {
    inquirer
        .prompt([
            {
                name: 'first',
                type: 'input',
                message: 'Enter employee name:',
            },
            {
                name: 'last',
                type: 'input',
                message: 'Enter employee last name:',
            }, {
                name: 'id',
                type: 'input',
                message: 'Enter employee id:',
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Succesfully added employee');
                }
            );
        });
};
// init();

begin();



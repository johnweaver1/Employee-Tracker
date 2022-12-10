//Using mysql12!
const mysql = require('mysql2')
const express = require('express');
// To use Inquirer
const inquirer = require('inquirer');
// Using the .env file to bring my password without sharing to the whole web
require('dotenv').config();
//connection to databases as well as using .env file to connect password.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_db'
  });

  // Express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
  
  connection.connect(err=>{
    if (err) throw err;
    console.log('user' + connection.threadId);
    startUp();
  });
  //When connecting using NPM start I display a cool message. Then prompt the user to start the stuff!
  startUp = () => {
    console.log('------------------------------')
    console.log('          Employee            ')
    console.log('          Manager!             ')
    console.log('------------------------------')
    prompts();
  }
  //Creating prompts for actons after the message!
  function prompts() {
    inquirer.prompt ([
        {
            type: 'list',
            message: 'Select what you would like to see!',
            name: 'prompts',
            choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role',
                    'Add Employee', 'Update Employee', 'Quit']
        }
    ])
    .then((answer) => {
        switch (answer.prompts) {
            case "Departments":
            displayDepartments();
            break;
        
            case "Roles":
            displayRoles();
            break;

            case "Employees":
            displayEmployees();
            break;
        
            case "Add Department":
            addDepartment();
            break; 

            case "Add Role":
            addRole();
            break;
        
            case "Add Employee":
            addEmployee();
            break;
        
            case "Update Employee":
            updateEmployee();
            break;
        
            case "Quit":
            mysqlConnect.end();
            break;
        }
    })
  }
  //Function for dispalying my departments!
  const displayDepartments = () => {
    console.log('Showing all departments...\n');
    connection.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        startUp();
    });
};
//Function for dispalying my roles!
const displayRoles = () => {
    connection.query(`SELECT * FROM role`, (err, results) => {
        err ? console.error(err) : console.table(results); 
        startUp();
    })
};
//Function for displaying Employees
const displayEmployees = () => {
    connection.query(`SELECT * FROM employee`, (err, results) => {
        err ? console.error(err) : console.table(results); 
        startUp();
    })
};
//Function for adding a department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the name of the Department you wish to add?",
                name: "addDept"
            }
        ]).then(ans => {
            connection.query(`INSERT INTO department(name)
                    VALUES(?)`, ans.addDept, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    connection.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        startUp();
                    })
                }
            }
            )
        })
};
//function for adding a role
const addRole = () => {
    const deptChoices = () => connection.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);
            return arrNames
        })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of the role you'd like to add?",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "roleSalary"
            },
            {
                type: "list",
                message: "Which department is this role in?",
                name: "addDept",
                choices: deptChoices
            }
        ]).then(ans => {
            connection.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDept)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    return mappedId[0]
                })
                .then((mappedId) => {
                    connection.promise().query(`INSERT INTO role(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                    startUp();
                })
        })
};
//function for adding an employee
const addEmployee = () => {
    const roleChoices = () => connection.promise().query(`SELECT * FROM role`)
        .then((rows) => {
            let arrTitle = rows[0].map(obj => obj.title);
            return arrTitle
        })
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's first name?",
                name: "name_first"
            },
            {
                type: "input",
                message: "Enter the employee's last name?",
                name: "name_last"
            },
            {
                type: "list",
                message: "Which role is this?",
                name: "addRole",
                choices: roleChoices
            }
        ]).then(ans => {
            connection.promise().query(`SELECT id FROM role WHERE title = ?`, ans.addRole)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    return mappedId[0]
                })
                .then((mappedId) => {
                    connection.promise().query(`INSERT INTO employee(name_first, name_last, role_id)
                VALUES(?, ?, ?)`, [ans.name_first, ans.name_last, mappedId]);
                startUp();
                })
        })
};
//function to update an employee 
updateEmployee = () => {
    inquirer.prompt([
        {
            name: "name_first",
            type: "input",
            message: "Please enter the first name of the employee you want update in the database."
        },
        {
            name: "manager_id",
            type: "number",
            message: "Please enter the new manager's id number associated with the employee you want to update in the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET manager_id = ? WHERE name_first = ?", [response.manager_id, response.name_first], function (err, data) {
            if (err) throw err;
            console.log("The new manager's id has been entered.");

            connection.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startUp();
            });
        })
});
};
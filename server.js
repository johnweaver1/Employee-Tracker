//Using mysql12!
const mysql = require('mysql2')
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
  //Functions for dispalying my departments!
  displayDepartments = () => {
    console.log('Showing all departments...\n');
    connection.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        startUp();
    });
};
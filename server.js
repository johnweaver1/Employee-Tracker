//Using mysql12!
const mysql = require('mysql2')
// To use Inquirer
const inquirer = require('inquirer');
// Using the .env file to bring my password without sharing to the whole web
require('dotenv').config();
//connection to databases as well as using .env file to connect password.
const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_db'
  });
  
  mysqlConnect.connect(err=>{
    if (err) throw err;
    console.log('user' + mysqlConnect.threadId);
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
  const prompts=()=> {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'prompts',
            message: 'Select what you would like to see!',
            choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role',
                    'Add Employee', 'Update Employee']
        }
    ])
    .then((answers)=>{
        const selection = answers;
        if (selection === "Departments") {
            displayDepartments();
        }
        if (selection === "Roles"){
            displayRoles();
        }
    })
  }
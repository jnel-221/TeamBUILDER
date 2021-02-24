const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

//get info for Employee super class
const getEmployee = [
  {
    type: "input",
    name: "name",
    message: "Please enter employee name:",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter employee email:",
    validate: function (value) {
      let pass = value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if (pass) {
        return true;
      }
      return "Please enter valid email address.";
    },
  },
  {
    type: "list",
    name: "role",
    message: "Please select employee role: ",
    choices: ["Engineer", "Intern", "Manager"],
    default: "Engineer",
  },
];

//get GitHub for Engineer subclass
const getGitHub = [
  {
    type: "input",
    name: "github",
    message: "Please enter Engineers's GitHub profile name:",
  },
];

//get School name for Intern subclass
const getSchool = [
  {
    type: "input",
    name: "school",
    message: "Please enter name of Intern's school:",
  },
];

//get Office Number for Manager subclass
const getOfficeNumber = [
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter Manager's office number:",
  },
];

//confirm if user wants to add a new team member
const confirmAddEmployee = [
  {
    type: "confirm",
    name: "addEmployee",
    message: "Would you like to add a new employee?",
  },
];

async function init() {
  const team = [];
  let newEmployee = true;

  while (newEmployee) {
    const { name, id, email, role } = await inquirer.prompt(getEmployee);

    if (role === "Engineer") {
      const { github } = await inquirer.prompt(getGitHub);
      const newEngineer = new Engineer(name, id, email, github);
      team.push(newEngineer);
    } else if (role === "Intern") {
      const { school } = await inquirer.prompt(getSchool);
      const newIntern = new Intern(name, id, email, school);
      team.push(newIntern);
    } else if (role === "Manager") {
      const { officeNumber } = await inquirer.prompt(getOfficeNumber);
      const newManager = new Manager(name, id, email, officeNumber);
      team.push(newManager);
    }
    const { addEmployee } = await inquirer.prompt(confirmAddEmployee);

    newEmployee = addEmployee;
  }

  fs.writeFile(outputPath, render(team), (err) => {
    err
      ? console.log(err)
      : console.log("Sending new team page to output file...");
  });
}

init();

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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//confirm
const confirmAddTeamMember = [
  {
    type: "confirm",
    name: "addEmployee",
    message: "Would you like to add a new team member?",
  },
];

const createEmployee = [
  {
    type: "input",
    name: "name",
    message: "Please Enter Employee Name:",
  },
  {
    type: "input",
    name: "id",
    message: "Please Enter Employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Please Enter Employee Email:",
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
    message: "Please Select Employee Role: ",
    choices: ["Engineer", "Intern", "Manager"],
    default: "Engineer",
  },
];

const getGitHub = [
  {
    type: "input",
    name: "github",
    message: "Please Enter Employee's GitHub Profile Name:",
  },
];

const getSchool = [
  {
    type: "input",
    name: "school",
    message: "Please Enter The Name Of Employee's School:",
  },
];

const getOfficeNumber = [
  {
    type: "input",
    name: "officeNumber",
    message: "Please Enter Employee's Office Number:",
  },
];

async function init() {
  const team = [];
  newEmployee = true;

  const { name, id, email, role } = await inquirer.prompt(createEmployee);

  console.log("what's this?", name, id, email, role);

  if (role === "Engineer") {
    const { github } = await inquirer.prompt(getGitHub);
    console.log(name, id, email, role, github);
  } else if (role === "Intern") {
    const { school } = await inquirer.prompt(getSchool);
    console.log(school);
  } else if (role === "Manager") {
    const { officeNumber } = await inquirer.prompt(getOfficeNumber);
    console.log(officeNumber);
  }
  const addNew = await inquirer.prompt(confirmAddTeamMember);
  newEmployee = addNew;
  console.log(addNew);
  console.log(newEmployee);
}

// async function chooseRole(role) {
//   switch (role) {
//     case "Engineer":
//       const { github } = await inquirer.prompt(getGitHub);
//       console.log(github);
//       break;
//     case "Intern":
//       const { school } = await inquirer.prompt(getSchool);
//       console.log(school);
//       break;
//     case "Manager":
//       const { officeNumber } = await inquirer.prompt(getOfficeNumber);
//       console.log(officeNumber);
//       break;
//     default:
//       console.log(role);
//   }
// }
// chooseRole(role);

init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

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
const team = [];

const inquireManager = [
  {
    type: "input",
    name: "name",
    message: "Please enter your manager's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter your manager's ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your manager's email.",
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
    type: "input",
    name: "officeNumber",
    message: "Please Please enter your manager's office number.",
  },
  {
    type: "list",
    name: "role",
    message: "Please select the type of team member you wish to add:",
    choices: ["Engineer", "Intern", "Finnished Entering Team"],
    default: 2,
  },
];

const inquireEngineer = [
  {
    type: "input",
    name: "name",
    message: "Please enter your engineers's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter your engineers's ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your engineers's email.",
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
    type: "input",
    name: "github",
    message: "Please enter your engineer's GitHub profile name.",
  },
  {
    type: "list",
    name: "role",
    message: "Please select the type of team member you wish to add:",
    choices: ["Engineer", "Intern", "Finnished Entering Team"],
    default: 2,
  },
];

const inquireIntern = [
  {
    type: "input",
    name: "name",
    message: "Please enter your intern's name:",
  },
  {
    type: "input",
    name: "id",
    message: "Please enter your intern's ID",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your intern's email.",
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
    type: "input",
    name: "school",
    message: "Please enter the name of your intern's school.",
  },
  {
    type: "list",
    name: "role",
    message: "Please select the type of team member you wish to add:",
    choices: ["Engineer", "Intern", "Finnished Entering Team"],
    default: 2,
  },
];

async function getManager() {
  try {
    const newManager = await inquirer.prompt(inquireManager);
    team.push(newManager);
    //console.log(newManager);
    if (newManager.choices === "Finnished Entering Team") {
      console.log("Team Awesome Roster: ", team.join(", "));
    } //else {
     // getManager();
    //}
  } catch (err) {
    return new Error(err);
  }
}
getManager();
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
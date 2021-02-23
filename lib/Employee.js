// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    const role = "Employee";

    this.name = name;
    this.role = role;
    this.id = id;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    if (this.role === "Employee") {
      return this.role;
    } else {
      return "Oops, " + this.role + " is not an Employee!";
    }
  }
}

module.exports = Employee;

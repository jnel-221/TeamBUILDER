// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    //role is hardcoded to Employee in superclass
    this.name = name;
    this.role = "Employee";
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
  getRole(role) {
    //let defaultRole = "Employee";
    if (role !== "Employee") {
      return this.role;
    } else {
      return "Employee";
    }
  }
}

module.exports = Employee;

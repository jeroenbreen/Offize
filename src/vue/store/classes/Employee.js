import _Base from './_Base'

class Employee extends _Base {

    constructor(employee) {
        super(employee);
        this.type = 'employee';
        this.name = employee ? employee.name : '';
        this.email = employee ? employee.email : '';
        this.initials = employee ? employee.initials : '';
        this.mailFooter = employee ? employee.mailFooter : 'Met vriendelijke groeten,<br><br>';
    }
}

export default Employee
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit{
  employees:Employee[] = [];
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  newEmployee!:NgForm;
  constructor(private userAuth:UserAuthService){

  }
  ngOnInit(): void {
    this.getEmployeeList()
  }

  geStatus(event:any){
    console.log(event.target.checked)
  }
  
  validateEmployeeForm(form:NgForm):boolean{
    this.newEmployee = form
    if(!this.emailExp.test(this.newEmployee.value.email)){
      console.log("Invalid email")
      return false
    }
    return true
  }

  addEmployee(form:any){
    console.log(form.value)
    if(this.validateEmployeeForm(form)){
      form = {
        "name": this.newEmployee.value.name,
        "role": this.newEmployee.value.role,
        "email": this.newEmployee.value.email,
        "password": "password"
      }
      this.userAuth.signUp(form).subscribe(
        (response) =>{
          console.log(response)
          this.getEmployeeList()
        }
        )
    }
  }

  getEmployeeList(){
    this.userAuth.getEmployeesList().subscribe(
      (response:any) =>{
        this.employees = response
      }
    )
  }
}

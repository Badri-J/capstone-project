import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageEmployeeComponent } from '../manage-employee.component';
import { Employee } from 'src/app/interfaces/employee';
import { UserAuthService } from 'src/app/Service/user-auth.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css',
              '../manage-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private manageEmpComp:ManageEmployeeComponent,
    private userAuth:UserAuthService ){

  }

  public get empID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  empid = this.empID
  emp!:Employee;
  
  statusText: string = "";
  statusClass: string = 'hidden';
  background: string = "bg-transparent";
  
  animatePopup(text: any, background: any) {
    this.statusText = text
    this.statusClass = 'show';
    this.background = background;
    setTimeout(
      () => {
        this.statusClass = 'hidden'
      }, 3000
    )
  }

  ngOnInit(){
    this.getEmp()
  }

  close(){
    this.router.navigate(['/admin/employees'])
    this.manageEmpComp.hideUpdateEmployee()
  }
  
  getEmp(){
    this.userAuth.getByID(this.empID!).subscribe(
      (response:any) => {
        this.emp = response;
      }
      )
  }
  
  updateEmployee(form:NgForm){
    console.log(form.value)
    if(form.value.name === "" || form.value.email === "" || form.value.role === ""){
      console.log("All Fields are required !!")
      this.animatePopup("All Fields are required !!","bg-red")
    }else if(!this.emailExp.test(form.value.email )){
      console.log("Invalid Email ID")
      this.animatePopup("Inalid Email ID","bg-red")
    }else{
      let detailsUpdate = {'id':this.empid, 'name':form.value.name, 'email':form.value.email , 'role':form.value.role}
      this.userAuth.updateEmployee(detailsUpdate).subscribe(
        (response:any) => {
          console.log(response)
          this.animatePopup(response.message,"bg-trans")
          setTimeout(() => {
            this.router.navigate(['/employees'])
            this.manageEmpComp.hideUpdateEmployee()
          }, 3000);
          this.manageEmpComp.getEmployeeList()
        }
      )
    }
  }
}

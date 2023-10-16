import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit{
  employees:Employee[] = [];
  message!:string;
  status:string = 'show-alert';
  showAlert:boolean = false;
  p:number=1;
  itemsPerPage:any;
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  newEmployee!:NgForm;
  showAddForm:boolean = false; // Change After
  blur:string="no-blur"
  showUpdateForm:boolean = false;
  isChecked!:boolean;
  totalEmployees!:number;
  config: any;
  searchText = '';

  statusText: string = "";
  statusClass: string = 'hidden';
  background: string = "bg-transparent";
  deleteEmp: boolean = false;
  
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

  constructor(private userAuth:UserAuthService, private router:Router){}
  
  ngOnInit(): void {
    this.getEmployeeList()
  }

  id!:string;

  setID(id:string){
    this.id = id
  }

  getID():string{
    return this.id;
  } 

  closeAlert(){
    this.showAlert = false
  }

  updateStatus(id:string,event:any){
    console.log(id,event.target.checked)
    let status:string = event.target.checked ? "true" : "false";
    console.log(status)
    this.userAuth.updateStatus(id,status).subscribe(
      (response:any) =>{
        console.log(response)
        this.animatePopup(response.message,event.target.checked?'bg-trans':'bg-red')
      }
    );
  }
  
  showAddEmployee(){
    this.showAddForm = true;
    this.blur = "add-blur"
  }

  hideAddEmployee(){
    this.showAddForm = false;
    this.blur = "no-bur"
  }

  showUpdateEmployee(empid:string){
    this.router.navigate(['employees/updateEmployee',empid])
    this.blur = "add-blur"
    this.showUpdateForm = true;
  }

  hideUpdateEmployee(){
    this.showUpdateForm = false;
    this.blur = "no-bur"
  }

  validateEmployeeForm(form:NgForm):boolean{
    this.newEmployee = form
    if(form.value.name === "" || form.value.role === "" || form.value.email === ""){
      console.log("All Fields are required")
      this.animatePopup("All Fields are required","bg-red")
      return false;
    }
    else if(form.value.role === "admin"){
      console.log("Cannot add Admin")
      this.animatePopup("Cannot add admin","bg-red")
      return false
    }
    else if(!this.emailExp.test(this.newEmployee.value.email)){
      console.log("Invalid email")
      this.animatePopup("Invalid email ID","bg-red")
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
        (response:any) =>{
          console.log(response)
          if(response.message === "Signed Up Successfully"){
            this.animatePopup("Employee Added","bg-trans")
            setTimeout(() => {
                this.hideAddEmployee()
            }, 3000);
          }
          else{
            this.animatePopup(response.message,"bg-red")
          }
          this.getEmployeeList()
        }
        )
    }
  }
  deleteEmpl(){
    this.userAuth.deteteEmployee(this.getID()).subscribe(
      (response:any) => {
        console.log(response)
        this.animatePopup(response.message,"bg-trans")
        this.getEmployeeList()
      }
    )
  this.showAlert = false;
  }
  deleteEmployee(id:string){
    console.log(id)
    this.setID(id)
    this.showAlert = true;
  }

  getEmployeeList(){
    this.userAuth.getEmployeesList().subscribe(
      (response:any) =>{
        this.employees = [];
        for(let i = 0; i < response.length; i++){
          response[i].status = (response[i].status === "true")?true:false
          this.employees.push(response[i])
          this.totalEmployees = this.employees.length
        }
        console.log(this.employees)
      }
    )
  }
}

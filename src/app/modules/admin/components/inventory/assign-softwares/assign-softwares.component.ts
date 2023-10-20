import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SoftwareService } from 'src/app/Service/software.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';
import { Software } from 'src/app/interfaces/software';

@Component({
  selector: 'app-assign-softwares',
  templateUrl: './assign-softwares.component.html',
  styleUrls: ['./assign-softwares.component.css',
'../inventory.component.css']
})
export class AssignSoftwaresComponent {

  employeesList:Employee[] = [];
  softwareList:Software[] = [];
  softwareNames:string[] =[];
  selectedEmployee!:Employee;
  deviceForm!:NgForm;
  showTable:boolean =false;

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

  constructor(private employeeService:UserAuthService,
    private softwareService:SoftwareService){

  }

  ngOnInit(): void {
    this.getEmployeeList()
    this.getSoftwareNames()
  }

  getEmployeeList(){
    this.employeeService.getEmployeesList().subscribe(
      (response:any) => {
        this.employeesList = response
        console.log(this.employeesList)
      }
    )
  }

  getSoftwareList(name:string){
    this.softwareService.getUnassignedSoftwares().subscribe(
      (response:any) => {
        console.log(response)
        this.softwareList = []
       for(let i = 0; i < response.length; i++){
        let software:Software = {
          "id":response[i].software_id,
          "name":response[i].name,
          "version":response[i].version,
          "dateAdded":response[i].date_added
        }
        if(software.name === name ){
          this.softwareList.push(software)
        }
       }
       if(this.softwareList.length === 0){
        this.showTable = false
       }
       else{
        this.showTable = true
       }
      }
      )
  }

  

  getFormDetails(f:NgForm){
    this.deviceForm = f
    this.getSoftwareList(f.value.softwareName)
  }

  getSoftwareNames(){
    this.softwareService.getSoftwareNames().subscribe(
      (response:any) =>{
        this.softwareNames =response
      }
    )
  }

  assignSoftware(id:string){
    console.log("sof_id: ",id)
    console.log("emp_id: ",this.deviceForm.value.emp_id)
    let details = {
      "emp_id":this.deviceForm.value.emp_id,
      "sof_id":id
    }
    this.employeeService.assignSoftware(details).subscribe(
      (response:any) => {
        this.animatePopup(response.message,"bg-trans")
        this.getSoftwareList(this.deviceForm.value.softwareName)
      }
    )
  }
}

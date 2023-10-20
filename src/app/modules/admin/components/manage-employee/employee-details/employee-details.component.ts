import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageEmployeeComponent } from '../manage-employee.component';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';
import { Device } from 'src/app/interfaces/device';
import { Software } from 'src/app/interfaces/software';
import { License } from 'src/app/interfaces/license';
import { LicenseService } from 'src/app/Service/license.service';
import { DeviceService } from 'src/app/Service/device.service';
import { SoftwareService } from 'src/app/Service/software.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css',
  '../manage-employee.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private manageEmpComp:ManageEmployeeComponent, 
    private employeeService:UserAuthService,
    private deviceService:DeviceService,
    private softwareService:SoftwareService ){}

    ngOnInit(){
      this.getEmp()
      this.getDevices()
      this.getSoftwares()
    }

    getEmp(){
      this.employeeService.getByID(this.empID!).subscribe(
        (response:any) => {
          this.emp = response;
        }
        )
    }

  public get empID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  empid = this.empID
  emp!:Employee
  devices:Device[]=[]
  softwares:Software[] =[]
  licenses:License[] = []

  close(){
    this.router.navigate(['/admin/employees'])
    this.manageEmpComp.hideUpdateEmployee()
  }

  getDevices(){
    this.employeeService.getDevices(this.empid!).subscribe(
      (response:any) => {
        console.log(response)
        this.devices = []
        for(let i = 0; i < response.length; i++){
        let device:Device = {
          "id":response[i].device_id,
          "name":response[i].name,
          "type":response[i].type,
          "category":response[i].category,
          "dateAdded":response[i].date_added
        }
        this.devices.push(device)
        this.deviceService.getLicense(device.id).subscribe(
          (response:any) =>{
            if(response !== null){
              let license:License = {
                "id":response.license_id,
                "name":response.name,
                "type":response.type,
                "dateIssued":response.date_issued,
                "expiryDate":response.expiry_date
              }
              if(!this.licenses.includes(license)){
                this.licenses.push(license)
              }
            }
          }
          )
       }
      }
    )
  }

  getSoftwares(){
    this.employeeService.getSoftwares(this.empid!).subscribe( 
      (response:any) => {
        console.log(response)
        this.softwares = []
       for(let i = 0; i < response.length; i++){
        let software:Software = {
          "id":response[i].software_id,
          "name":response[i].name,
          "version":response[i].version,
          "dateAdded":response[i].date_added
        }
        this.softwares.push(software)
        console.log(software.id)
        this.softwareService.getLicense(software.id).subscribe(
          (response:any) =>{
            if(response !== null){
              let license:License = {
                "id":response.license_id,
                "name":response.name,
                "type":response.type,
                "dateIssued":response.date_issued,
                "expiryDate":response.expiry_date
              }
              if(!this.licenses.includes(license)){
                this.licenses.push(license)
              }
            }
          }
          )
      }
      }
    )
  }


}

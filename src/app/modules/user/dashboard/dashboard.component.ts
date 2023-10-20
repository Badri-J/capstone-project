import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/Service/device.service';
import { SoftwareService } from 'src/app/Service/software.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Device } from 'src/app/interfaces/device';
import { Employee } from 'src/app/interfaces/employee';
import { License } from 'src/app/interfaces/license';
import { Software } from 'src/app/interfaces/software';
import { ManageEmployeeComponent } from '../../admin/components/manage-employee/manage-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router:Router, 
    private employeeService:UserAuthService,
    private deviceService:DeviceService,
    private softwareService:SoftwareService ){}

    ngOnInit(){
      this.getDevices()
      this.getSoftwares()
    }

  emp:Employee = this.employeeService.getLoggedInEmployee();
  
  devices:Device[]=[]
  softwares:Software[] =[]
  licenses:License[] = []
  d_count!:number;
  l_count!:number;
  s_count!:number;


  getDevices(){
    console.log(this.employeeService.getLoggedInEmployee())
    this.employeeService.getDevices(this.employeeService.getLoggedInEmployee().empid).subscribe(
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
                this.l_count = this.licenses.length
              }
            }
          }
          )
       }
       this.d_count =this.devices.length
      }
    )
  }
  getSoftwares(){
    this.employeeService.getSoftwares(this.employeeService.getLoggedInEmployee().empid).subscribe( 
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
                this.l_count = this.licenses.length
              }
            }
          }
          )
        }
      this.s_count = this.softwares.length
      }
    )
  }
}

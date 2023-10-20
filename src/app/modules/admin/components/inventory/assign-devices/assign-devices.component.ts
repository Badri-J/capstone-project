import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from 'src/app/Service/device.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Device } from 'src/app/interfaces/device';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-assign-devices',
  templateUrl: './assign-devices.component.html',
  styleUrls: ['./assign-devices.component.css',
'../inventory.component.css']
})
export class AssignDevicesComponent implements OnInit {

  constructor(private employeeService:UserAuthService, private deviceService:DeviceService){}
  
  employeesList:Employee[] = [];
  deviceList:Device[] = [];
  deviceNames:string[] =[];
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

  ngOnInit(): void {
    this.getEmployeeList()
    this.getDeviceNames()
  }

  getEmployeeList(){
    this.employeeService.getEmployeesList().subscribe(
      (response:any) => {
        this.employeesList = response
        console.log(this.employeesList)
      }
    )
  }

  getDeviceList(name:string){
    this.deviceService.getUnAssignedDevices().subscribe(
      (response:any) => {
        console.log(response)
        this.deviceList = []
       for(let i = 0; i < response.length; i++){
        let device:Device = {
          "id":response[i].device_id,
          "name":response[i].name,
          "type":response[i].type,
          "category":response[i].category,
          "dateAdded":response[i].date_added
        }
        if(device.name === name ){
          this.deviceList.push(device)
        }
       }
       if(this.deviceList.length === 0){
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
    this.getDeviceList(f.value.deviceName)
  }

  getDeviceNames(){
    this.deviceService.getDeviceNames().subscribe(
      (response:any) =>{
        this.deviceNames =response
      }
    )
  }

  assignDevice(id:string){
    console.log("dev_id: ",id)
    console.log("emp_id: ",this.deviceForm.value.emp_id)
    let details = {
      "emp_id":this.deviceForm.value.emp_id,
      "dev_id":id
    }
    this.employeeService.assignDevice(details).subscribe(
      (response:any) => {
        this.animatePopup(response.message,"bg-trans")
        this.getDeviceList(this.deviceForm.value.deviceName)
      }
    )
  }
}

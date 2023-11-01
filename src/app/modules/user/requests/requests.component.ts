import { Component } from '@angular/core';
import { LicenseService } from 'src/app/Service/license.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { License } from 'src/app/interfaces/license';
import { Device } from 'src/app/interfaces/device';
import { Software } from 'src/app/interfaces/software';
import { Employee } from 'src/app/interfaces/employee';
import { SoftwareService } from 'src/app/Service/software.service';
import { DeviceService } from 'src/app/Service/device.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  constructor(private router:Router, 
    private employeeService:UserAuthService,
    private deviceService:DeviceService,
    private softwareService:SoftwareService,
    private licenseService:LicenseService ){}

    ngOnInit(){
      this.getDevices()
      this.getSoftwares()
    }

  
  devices:Device[]=[]
  softwares:Software[] =[]
  licenses:License[] = []
  licensesToExpire:License[] = []
  showRenewal!:boolean;
  d_count!:number;
  l_count!:number;
  s_count!:number;
  renewalText!:string;
  renewalStyle!:string;

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

  getLicenseStatus(l:License){
    let curr_date:Date = new Date()
    let exp_date:Date = new Date(l.expiryDate)
    let diff = Math.abs(curr_date.getTime() - exp_date.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) -1;
    this.showRenewal = true
    if(diffDays <= 15){
      if(!this.licensesToExpire.includes(l)){
        this.licensesToExpire.push(l)
      }
      if(diffDays < 0){
        this.renewalText = `Expiring in ${diffDays} days`
      }
      if(diffDays === 0){
        this.renewalText = "Expiring today"
      }
      if(diffDays > 0){
        this.renewalText = `Expired ${diffDays} days ago`
      }
    }
    else{
      this.renewalStyle = "green"
      this.renewalText = `All good`
    }
    return this.renewalText
  }

  getRenewalStyle(l:License){
    let curr_date:Date = new Date()
    let exp_date:Date = new Date(l.expiryDate)
    let diff = Math.abs(curr_date.getTime() - exp_date.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)) -1;
    this.showRenewal = true
    if(diffDays <= 15){
      if(diffDays < 0){ // expiring in x days
        this.renewalStyle = "red"
      }
      if(diffDays === 0){ // expiring today
        this.renewalStyle = "red"
      }
      if(diffDays > 0){ // expired already
        this.renewalStyle = "red"
      }
    }else{
      this.renewalStyle = "green"
    }
    return this.renewalStyle
  }

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
                "expiryDate":response.expiry_date,
              }
              if(!this.licenses.includes(license)){
                license.licenseStatus = this.getLicenseStatus(license)
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
                license.licenseStatus = this.getLicenseStatus(license)
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
  raiseRequest(id:string){
    this.licenseService.raiseRequest(id).subscribe(
      (response:any) => {
        this.animatePopup(response.message,"bg-trans")
      }
    )
  }
}

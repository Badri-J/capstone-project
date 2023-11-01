import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from 'src/app/Service/device.service';
import { LicenseService } from 'src/app/Service/license.service';
import { SoftwareService } from 'src/app/Service/software.service';
import { Device } from 'src/app/interfaces/device';
import { License } from 'src/app/interfaces/license';
import { Software } from 'src/app/interfaces/software';

@Component({
  selector: 'app-assign-licenses',
  templateUrl: './assign-licenses.component.html',
  styleUrls: ['./assign-licenses.component.css','../inventory.component.css']
})
export class AssignLicensesComponent implements OnInit{
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

  constructor(private softwareService:SoftwareService,
              private deviceService:DeviceService,
              private licenseService:LicenseService){
  }

  ngOnInit(): void {
    this.getLicenseList(this.licenseType)
  }

  license_id!:string;
  licenseType:string = "Software";
  licenseNames:string[] = []
  licenses:License[] = []
  selectedLicense!:License;
  softwareList:Software[]=[]
  deviceList:Device[]=[]
  showSoftwareTable:boolean = false;
  showDeviceTable:boolean = false;

  getFormDetails(form:NgForm){
    // console.log(form.value)
    let l:string[] = form.value.license.split(/\s{2}/)
    this.license_id = l[0]
    if(form.value.licenseType === "Software"){ 
      console.log(l)
      this.showSoftwares(l[1])
    }else{
      this.showDevices(l[1])
    }
  }

  assignDevice(dev_id:string,name:string){
    this.licenseService.assignDevice({"lic_id":this.license_id,"dev_id":dev_id}).subscribe(
      (response:any) =>{
        this.animatePopup(response.message,'bg-trans')
        this.showDevices(name)
      }
    )
  }

  assignSoftware(sof_id:string, name:string){
    this.licenseService.assignSoftware({"lic_id":this.license_id,"sof_id":sof_id}).subscribe(
      (response:any) =>{
        this.animatePopup(response.message,'bg-trans')
        this.showSoftwares(name)
      }
    )
  }

  updateLicenseType(licenseType:string){
    this.licenseType = licenseType
    this.getLicenseList(licenseType)
  }

  showSoftwares(name:string){
    this.showDeviceTable = false;
    this.softwareService.getUnLicensedSoftwares().subscribe(
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
        this.showSoftwareTable = false
       }
       else{
        this.showSoftwareTable = true
       }
      }
    )
  }

  showDevices(name:string){
    this.showSoftwareTable = false;
    this.deviceService.getUnLicensesdDevices().subscribe(
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
        this.showDeviceTable = false
       }
       else{
        this.showDeviceTable = true
       }
      }
    )
  }

  getLicenseList(licenseType:string){
    this.licenseService.getUnAssignedLicenses().subscribe(
        (response:any) => {
          console.log(response)
          this.licenses = []
          for(let i = 0; i < response.length; i++){
            if(response[i].type === licenseType){
            let license:License = {
              "id":response[i].license_id,
              "name":response[i].name,
              "type":response[i].type,
              "dateIssued":response[i].date_issued,
              "expiryDate":response[i].expiry_date
            }
              this.licenses.push(license)
            }
          }
        }
    )
  }

  

}

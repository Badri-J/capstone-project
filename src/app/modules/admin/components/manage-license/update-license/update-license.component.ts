import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/Service/device.service';
import { Device } from 'src/app/interfaces/device';
import { ManageDeviceComponent } from '../../manage-device/manage-device.component';
import { License } from 'src/app/interfaces/license';
import { LicenseService } from 'src/app/Service/license.service';
import { ManageLicenseComponent } from '../manage-license.component';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.css',
  '../manage-license.component.css']
})
export class UpdateLicenseComponent {
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private manageLicenseComp:ManageLicenseComponent,
    private licenseService:LicenseService ){

  }

  public get devID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  licenseid = this.devID
  license!:License;
  
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
    this.getDevice()
  }

  close(){
    this.router.navigate(['/admin/licenses'])
    this.manageLicenseComp.hideUpdateLicense()
  }

  getDevice(){
    this.licenseService.getLicense(this.licenseid!).subscribe(
      (response:any) =>{
        console.log(response)
        this.license = {
         id : response.license_id,
         type : response.type,
         dateIssued : response.date_issued,
         expiryDate : response.expiry_date
        }
      }
    )
  }
  
  updateLicense(form:NgForm){
    console.log(form.value)
    if(form.value.type === "" || form.value.dateIssued === "" || form.value.expiryDate === ""){
      console.log("All Fields are required !!")
      this.animatePopup("All Fields are required !!","bg-red")
    }else{
      let detailsUpdate = {
        'id':this.licenseid,
        'type':form.value.type, 
        'dateIssued':form.value.dateIssued,
        'expiryDate':form.value.expiryDate
      }
      console.log(detailsUpdate)
      this.licenseService.updateLicense(detailsUpdate).subscribe(
        (response:any) => {
          this.animatePopup(response.message,'bg-trans')
          setTimeout(() => {
            this.router.navigate(['/admin/licenses'])
          }, 3000);
        }
      )
    }
  }
}

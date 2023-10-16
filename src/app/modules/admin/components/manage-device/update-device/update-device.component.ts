import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Device } from 'src/app/interfaces/device';
import { ManageDeviceComponent } from '../manage-device.component';
import { DeviceService } from 'src/app/Service/device.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css',
'../manage-device.component.css']
})
export class UpdateDeviceComponent {
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private manageDevComp:ManageDeviceComponent,
    private deviceService:DeviceService ){

  }

  public get devID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  deviceid = this.devID
  dev!:Device;
  
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
    this.router.navigate(['/admin/devices'])
    this.manageDevComp.hideUpdateDevice()
  }
  date!:Date;
  setDate(date:string){
    this.date = new Date(date)
  }
  getDate(){
    console.log(this.date.toLocaleDateString())
    return this.date;
  }
  getDevice(){
    this.deviceService.getDevice(this.deviceid!).subscribe(
      (response:any) =>{
        console.log(response)
        this.dev = {
         id:response.device_id,
         name:response.name,
         type:response.type,
         category:response.category,
         dateAdded:response.date_added,
        }
      }
    )
  }
  
  updateDevice(form:NgForm){
    console.log(form.value)
    if(form.value.name === "" || form.value.type === "" || form.value.category === "" || form.value.dateAdded === ""){
      console.log("All Fields are required !!")
      this.animatePopup("All Fields are required !!","bg-red")
    }else{
      let detailsUpdate = {
        'id':this.deviceid,
        'name':form.value.name,
        'type':form.value.type, 
        'category':form.value.category,
        'date_added':form.value.dateAdded
      }
      console.log(detailsUpdate)
      this.deviceService.updateDevice(detailsUpdate).subscribe(
        (response:any) => {
          this.animatePopup(response.message,'bg-trans')
          setTimeout(() => {
            this.router.navigate(['/admin/devices'])
          }, 3000);
        }
      )
    }
  }
}

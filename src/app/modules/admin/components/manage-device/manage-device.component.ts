import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/Service/device.service';
import { Device } from 'src/app/interfaces/device';

@Component({
  selector: 'app-manage-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.css']
})
export class ManageDeviceComponent implements OnInit{
  devices:Device[] = [];
  message!:string;
  status:string = 'show-alert';
  showAlert:boolean = false;
  p:number=1;
  itemsPerPage:any;
  newDevice!:NgForm;
  showAddForm:boolean = false;
  blur:string="no-blur"
  showUpdateForm:boolean = false;
  isChecked!:boolean;
  totalDevices!:number;
  config: any;
  searchText = '';

  statusText: string = "";
  statusClass: string = 'hidden';
  background: string = "bg-transparent";
  deleteEmp: boolean = false;
  closeAlert(){
    this.showAlert = false
  }

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

  constructor(private devService:DeviceService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllDevices()
  }

  id!:string;

  setID(id:string){
    this.id = id
  }

  getID():string{
    return this.id;
  }

  showAddDevice(){
    this.showAddForm = true;
    this.blur = "add-blur"
  }

  hideAddDevice(){
    this.showAddForm = false;
    this.blur = "no-bur"
  }

  showUpdateDevice(devId:string){
    this.router.navigate(['devices/updateDevice',devId])
    this.blur = "add-blur"
    this.showUpdateForm = true;
  }

  hideUpdateDevice(){
    this.showUpdateForm = false;
    this.blur = "no-bur"
  }

  addDevice(device:NgForm){
    let details:Object = {
      "name": device.value.name,
      "type": device.value.type,
      "category": device.value.category, 
      "dateAdded": device.value.dateAdded
    }
    console.log(details)
    this.devService.addDevice(details,device.value.qty).subscribe(
      (response:any) => {
        console.log(response)
        this.animatePopup(response.message,'bg-trans')
        this.getAllDevices()
      }
    )
  }

  getAllDevices(){
    this.devService.getAllDevices().subscribe(
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
       }
      }
    )
  }
  confirmDelete(){
    this.showAlert = false
    this.devService.deleteDevice(this.getID()).subscribe(
      (response:any) => {
        this.animatePopup(response.message,'bg-trans')
        this.getAllDevices()
      }
    )
  }
  deleteDevice(id:string){
    console.log(id)
    this.setID(id)
    this.showAlert = true;
  }

}

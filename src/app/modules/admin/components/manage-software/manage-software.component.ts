import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SoftwareService } from 'src/app/Service/software.service';
import { Software } from 'src/app/interfaces/software';

@Component({
  selector: 'app-manage-software',
  templateUrl: './manage-software.component.html',
  styleUrls: ['./manage-software.component.css']
})
export class ManageSoftwareComponent {
  softwares:Software[] = [];
  message!:string;
  status:string = 'show-alert';
  showAlert:boolean = false;
  p:number=1;
  itemsPerPage:any;
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  newDevice!:NgForm;
  showAddForm:boolean = false;
  blur:string="no-blur"
  showUpdateForm:boolean = false;
  isChecked!:boolean;
  totalSoftwares!:number;
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

  constructor(private softwareService:SoftwareService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllSoftwares()
  }

  id!:string;

  setID(id:string){
    this.id = id
  }

  getID():string{
    return this.id;
  }

  showAddSoftware(){
    this.showAddForm = true;
    this.blur = "add-blur"
  }

  hideAddSoftware(){
    this.showAddForm = false;
    this.blur = "no-bur"
  }

  showUpdateDevice(devId:string){
    this.router.navigate(['softwares/updateSoftware/',devId])
    this.blur = "add-blur"
    this.showUpdateForm = true;
  }

  hideUpdateDevice(){
    this.showUpdateForm = false;
    this.blur = "no-bur"
  }

  addSoftware(software:NgForm){
    if(software.value.name==="" || software.value.version==="" || software.value.dateAdded==="") {
      this.animatePopup("All fields are required","bg-red")
      return;
    }
    let details:Object = {
      "name": software.value.name,
      "version": software.value.version, 
      "dateAdded": software.value.dateAdded
    }
    console.log(details)
    this.softwareService.addSoftwares(details,software.value.qty).subscribe(
      (response:any) => {
        console.log(response)
        this.animatePopup(response.message,'bg-trans')
        this.getAllSoftwares()
      }
    )
  }

  getAllSoftwares(){
    this.softwareService.getAllSoftwares().subscribe( // change it 
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
       }
      }
    )
  }
  confirmDelete(){
    this.showAlert = false
    this.softwareService.deleteSoftware(this.getID()).subscribe(
    (response:any) => {
      this.animatePopup(response.message,'bg-trans')
      this.getAllSoftwares()
      setTimeout(() => {
        this.showAlert = false
      }, 3000);
    }
    )
  }
  deleteSoftware(id:string){
    console.log(id)
    this.setID(id)
    this.showAlert = true;
  }
}

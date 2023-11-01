import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseService } from 'src/app/Service/license.service';
import { License } from 'src/app/interfaces/license';

@Component({
  selector: 'app-manage-license',
  templateUrl: './manage-license.component.html',
  styleUrls: ['./manage-license.component.css']
})
export class ManageLicenseComponent {
  licenses:License[] = [];
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
  totalLicenses!:number;
  searchText = '';

  statusText: string = "";
  statusClass: string = 'hidden';
  background: string = "bg-transparent";
  deleteEmp: boolean = false;
  
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
    
    closeAlert(){
      this.showAlert = false
    }

  constructor(private licenseService:LicenseService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllLicenses()
  }

  id!:string;

  setID(id:string){
    this.id = id
  }

  getID():string{
    return this.id;
  }

  showAddLicense(){
    this.showAddForm = true;
    this.blur = "add-blur"
  }

  hideAddLicense(){
    this.showAddForm = false;
    this.blur = "no-bur"
  }

  showUpdateLicense(licenseId:string){
    this.router.navigate(['licenses/updateLicense',licenseId])
    this.blur = "add-blur"
    this.showUpdateForm = true;
  }

  hideUpdateLicense(){
    this.showUpdateForm = false;
    this.blur = "no-bur"
  }

  addLicense(license:NgForm){
    if(license.value.type === "" || license.value.name==="" || license.value.dateIssued === "" || license.value.expiryDate === ""){
      this.animatePopup("All fields are required !!","bg-red")
    }
    let details:Object = {
      "type": license.value.type,
      "name":license.value.name,
      "dateIssued": license.value.dateIssued,
      "expiryDate":license.value.expiryDate
    }
    console.log(details)
    this.licenseService.addLicenses(details,license.value.qty).subscribe(
      (response:any) => {
        console.log(response)
        this.animatePopup(response.message,'bg-trans')
        this.getAllLicenses()
      }
    )
  }

  getAllLicenses(){
    this.licenseService.getAllLicenses().subscribe(
      (response:any) => {
        console.log(response)
       this.licenses = []
       for(let i = 0; i < response.length; i++){
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
    )
  }
  confirmDelete(){
    this.showAlert = false
    this.licenseService.deleteLicense(this.getID()).subscribe(
      (response:any) => {
        this.animatePopup(response.message,'bg-trans')
        this.getAllLicenses()
      }
    )
  }
  deleteLicense(id:string){
    console.log(id)
    this.setID(id)
    this.showAlert = true;
  }
}

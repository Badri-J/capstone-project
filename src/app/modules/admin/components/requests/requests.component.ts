import { Component, OnInit } from '@angular/core';
import { LicenseService } from 'src/app/Service/license.service';
import { License } from 'src/app/interfaces/license';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private licenseService:LicenseService){}
  ngOnInit(): void {
    this.getAllLicenses()
  }

  statusText: string = "";
  statusClass: string = 'hidden';
  background: string = "bg-transparent";
  deleteEmp: boolean = false;
  licenses:License[] = []
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

    getAllLicenses(){
      this.licenseService.getRequests().subscribe(
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
    
    accept(id:string){
      this.licenseService.acceptRequest(id).subscribe(
        (response:any) => {
          this.animatePopup(response.message,"bg-trans")
          this.getAllLicenses()
        }
      )
    }
}

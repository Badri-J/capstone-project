import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManageSoftwareComponent } from '../manage-software.component';
import { Software } from 'src/app/interfaces/software';
import { SoftwareService } from 'src/app/Service/software.service';

@Component({
  selector: 'app-update-software',
  templateUrl: './update-software.component.html',
  styleUrls: ['./update-software.component.css',
'../manage-software.component.css']
})
export class UpdateSoftwareComponent {
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private manageSoftware:ManageSoftwareComponent,
    private softwareService:SoftwareService ){

  }

  public get softwareID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  softwareId = this.softwareID
  software!:Software;
  
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
    this.getSoftware()
  }

  close(){
    this.router.navigate(['/admin/softwares'])
    this.manageSoftware.hideUpdateDevice()
  }
  date!:Date;
  setDate(date:string){
    this.date = new Date(date)
  }
  getDate(){
    console.log(this.date.toLocaleDateString())
    return this.date;
  }
  getSoftware(){
    this.softwareService.getSoftware(this.softwareId!).subscribe(
      (response:any) =>{
        console.log(response)
        this.software = {
         id:response.software_id,
         name:response.name,
         version:response.version,
         dateAdded:response.date_added,
        }
      }
    )
  }
  
  updateSoftware(form:NgForm){
    console.log(form.value)
    if(form.value.name === "" || form.value.version === "" || form.value.dateAdded === ""){
      this.animatePopup("All Fields are required !!","bg-red")
    }else{
      let detailsUpdate = {
        'id':this.softwareId,
        'name':form.value.name,
        'version':form.value.version,
        'dateAdded':form.value.dateAdded
      }
      console.log(detailsUpdate)
      this.softwareService.updateSoftware(detailsUpdate).subscribe(
        (response:any) => {
          this.animatePopup(response.message,'bg-trans')
          this.manageSoftware.getAllSoftwares()
          setTimeout(() => {
            this.router.navigate(['/admin/softwares'])
          }, 3000);
        }
      )
    }
  }
}

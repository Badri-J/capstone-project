import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/Service/email.service';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Email } from 'src/app/interfaces/email';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private userAuth:UserAuthService,
    public router:Router,
    private emailService:EmailService){}

  ngOnInit(): void {
    this.getCardDetails()
    this.getEmails()
  }
  employees!:number;
  devices!:number;
  softwares!:number;
  licenses!:number;
  routed:boolean=true;
  emails:Email[] = [];
  selectedEmail!:Email;

  getCardDetails(){
    this.userAuth.getDashBoardCardDetails().subscribe(
      (response:any) => {
        console.log(response)
        this.devices = response.device_count
        this.softwares = response.software_count
        this.employees = response.employee_count
        this.licenses = response.license_count
      }
    )
  }

  getEmails(){
    this.emailService.getEmails().subscribe(
      (response:any) => {
        for(let i = 0; i <response.length; i++){
          let email:Email = {
            id: response[i].id,
            toMail: response[i].to_mail,
            subject: response[i].subject,
            body: response[i].body
          }
          if(!this.emails.includes(email)){
            this.emails.push(email)
          }
        }
      }
    )
  }

  selectMail(mail:Email){
    this.selectedEmail = mail;
    this.router.navigate(['/admin/dashboard/email',mail.id])
  }

  employee:Employee = this.userAuth.getLoggedInEmployee()
}

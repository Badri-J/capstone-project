import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { Email } from 'src/app/interfaces/email';
import { EmailService } from 'src/app/Service/email.service';

@Component({
  selector: 'app-email-component',
  templateUrl: './email-component.component.html',
  styleUrls: ['./email-component.component.css']
})
export class EmailComponentComponent implements OnInit{
  constructor(public router:Router, private route:ActivatedRoute ,private emailService:EmailService){

  }
  ngOnInit(): void {
    console.log(this.emailID);
    this.getEmail()
  }
  id = this.emailID
  email!:Email; 
  public get emailID(){
    return this.route.snapshot.paramMap.get('id')?.toString()
  }

  public getEmail(){
    this.emailService.getEmail(this.id!).subscribe(
      (response:any) => {
        this.email = {
          'id':response.id,
          'toMail':response.to_mail,
          'subject':response.subject,
          'body':response.body,
          'time':'',
          'date':''
        }
        console.log(this.email)
      }
    )
  }
  



}

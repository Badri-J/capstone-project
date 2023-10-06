import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../user-auth.component.css']
})
export class LoginPageComponent {
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  warningText: string="";
  statusText: string="";
  statusClass:string = 'hidden';
  background:string ="bg-trans";
  constructor(private userAuth:UserAuthService, private router:Router){
    
  }

  animatePopup(text:any){
    this.statusText = text
    this.statusClass = 'show';
    setTimeout(
      () => {
        this.statusClass = 'hidden'
      },3000
    )
  }

  login(f:NgForm){
    let userID:string = f.value.userID
    let pass:string = f.value.password
    if(!userID  || !pass){
      this.background="bg-red"
      this.animatePopup("All fields are required !!")
    }
    else{
      this.userAuth.login(userID,pass).subscribe(
        (response:any) =>{
          if(response.message === "email password" || response.message === "empid password"){
            this.background = "bg-red"
            this.animatePopup("Invalid password")
          }else{
            this.background = "bg-trans"
            this.router.navigateByUrl('admin')
            this.animatePopup(response.message)
          }
        } 
      )
    }
  }
}

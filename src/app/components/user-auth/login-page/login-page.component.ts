import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../user-auth.component.css']
})
export class LoginPageComponent implements OnInit
 {
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  warningText: string="";
  statusText: string="";
  statusClass:string = 'hidden';
  background:string ="bg-trans";
  constructor(private userAuth:UserAuthService, private router:Router){
    
  }
  ngOnInit(): void {
    if(localStorage.getItem('loginState') === "true"){
      this.animatePopup('Fetching login details...')
      setTimeout(
        () => {
          if(this.userAuth.getLoggedInEmployee().role === "Admin"){
            this.router.navigate(['admin'])
          }else{
            this.router.navigate(['user'])
          }
        },1000
      )
    }
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
          }else if( response.message === "empid"){
            this.background = "bg-trans"
            this.animatePopup("Login Successfull !! ");
            this.userAuth.getByID(userID).subscribe(
              (response:any) => {
                this.userAuth.setLoggedInEmployee(response)
              }
            )
            setTimeout(
              ()=>{
                this.userAuth.setLoginState("true")
                if(this.userAuth.getLoggedInEmployee().role === "Admin"){
                  this.router.navigate(['admin'])
                }else{
                  this.router.navigate(['user'])
                }
              },3000
              );
          }else if( response.message === "email"){
            this.background = "bg-trans"
            this.animatePopup("Login Successfull !! ");
            this.userAuth.getByEmail(userID).subscribe(
              (response:any) => {
                console.log(response)
                this.userAuth.setLoggedInEmployee(response)
              }
            )
            setTimeout(
              ()=>{
                this.userAuth.setLoginState("true")
                if(this.userAuth.getLoggedInEmployee().role === "Admin"){
                  this.router.navigate(['admin'])
                }else{
                  this.router.navigate(['user'])
                }
              },3000
              );
          }
        } 
      )
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/userservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../user-auth.component.css']
})
export class LoginPageComponent {

  constructor(){
    
  }
  login(loginForm:NgForm){
    console.log("Emp ID: ",loginForm.value.empid)
    console.log("Password: ",loginForm.value.password)
  }
}

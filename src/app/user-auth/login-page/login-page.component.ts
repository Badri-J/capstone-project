import { Component } from '@angular/core';
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

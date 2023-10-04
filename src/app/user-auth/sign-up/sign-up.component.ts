
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../user-auth.component.css'],
  providers: [ UserAuthService]
})


export class SignUpComponent{
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  warningText: string="";
  statusText: string="";
  // public BadRequest: string="Email Exists";
  signUpForm!: NgForm;
  // form!: FormGroup;
  statusClass:string = 'hidden';
  // submitted = false;
  
  constructor(private router:Router, private service:UserAuthService){
    
  }

  animatePopup(){
    this.statusClass = 'show';
    setTimeout(
      () => {
        this.statusClass = 'hidden'
      },3000
    )
  }

  getFormData(form:NgForm){
    this.signUpForm = form;
  }

  validateSubmit(form:NgForm){
    this.getFormData(form)
    console.log(this.signUpForm.value)
    if(this.signUpForm.value.name === "" || this.signUpForm.value.email === ""
      || this.signUpForm.value.newPassword === "" || this.signUpForm.value.confirmPassword === ""){
        this.statusText = "All fields are required !"
        this.animatePopup()
        return false
    }
    else if(!this.emailExp.test(this.signUpForm.value.email)){
      this.statusText = "Enter a valid email ID"
      this.animatePopup()
      return false;
    }
    else if(this.signUpForm.value.newPassword !== this.signUpForm.value.confirmPassword){
      this.statusText = "Password and Confirm password must be same"
      this.animatePopup()
      return false
    }
    else{
      return true
    }
  }

  onSignUp(form:any){
    if(this.validateSubmit(form)){
      form = {
        "name": this.signUpForm.value.name,
        "email": this.signUpForm.value.email,
        "role": 'Admin',
        "password": this.signUpForm.value.confirmPassword
      }
      console.log(form)
      this.service.signUp(form)    
      .subscribe((response:any)=>{
        console.log(response)
        this.statusText = `${response.message}`;
        this.animatePopup()
      })
    }
  }

}


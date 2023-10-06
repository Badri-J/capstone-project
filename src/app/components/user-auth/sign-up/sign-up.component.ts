
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../user-auth.component.css'],
  providers: [UserAuthService]
})


export class SignUpComponent {
  emailExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  warningText: string = "";
  statusText: string = "";
  signUpForm!: NgForm;
  statusClass: string = 'hidden';
  background: string = "bg-transparent";

  constructor(private router: Router, private service: UserAuthService) {

  }

  animatePopup(text: any) {
    this.statusText = text
    this.statusClass = 'show';
    setTimeout(
      () => {
        this.statusClass = 'hidden'
      }, 3000
    )
  }

  getFormData(form: NgForm) {
    this.signUpForm = form;
  }

  validateSubmit(form: NgForm) {
    this.getFormData(form)
    console.log(this.signUpForm.value)
    if (this.signUpForm.value.name === "" || this.signUpForm.value.email === ""
      || this.signUpForm.value.newPassword === "" || this.signUpForm.value.confirmPassword === "") {
      this.background = "bg-red"
      this.animatePopup("All fields are required !")
      return false
    }
    else if (!this.emailExp.test(this.signUpForm.value.email)) {
      this.background = "bg-red"
      this.animatePopup("Enter a valid email ID")
      return false;
    }
    else if (this.signUpForm.value.newPassword !== this.signUpForm.value.confirmPassword) {
      this.background = "bg-red"
      this.animatePopup("Password and Confirm password must be same")
      return false
    }
    else {
      return true
    }
  }

  onSignUp(form: any) {
    if (this.validateSubmit(form)) {
      form = {
        "name": this.signUpForm.value.name,
        "email": this.signUpForm.value.email,
        "role": 'Admin',
        "password": this.signUpForm.value.confirmPassword
      }
      console.log(form)
      this.service.signUp(form)
        .subscribe((response: any) => {
          if(response.message === "Email Already exists"){
            this.background = "bg-red"
            this.animatePopup("Email ID Already Exists")
          }
          else{
            this.background = "bg-trans"
            this.animatePopup("Signed up successfully !!")
          }
        })
    }
  }

}


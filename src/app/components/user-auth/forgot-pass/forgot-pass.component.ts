import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css', '../user-auth.component.css']
})
export class ForgotPassComponent {
  // router: any;
  statusText: string = "";
  statusClass: string = 'hidden';
  isforget: boolean = false;
  isReset: boolean = false;
  background:string ="bg-trans";
  isCorrectVerification: boolean = false;
  // email:Email=new Email
  email: string = "";
  updation!: any
  otpfromspring!: any;
  otpfromuser!: any;
  constructor(private ds: UserAuthService, private router: Router) { }
  passwordupdate(form1: any) {
    // console.log(form1.value.NewPassword)
    // console.log(form1.value.ConfirmPassword)
    // console.log(this.updation)
    if (form1.value.NewPassword == form1.value.ConfirmPassword) {
      this.ds.updatepassword(this.email, form1.value.NewPassword).subscribe((res: any) => {
        this.updation = JSON.stringify(res)
            if (this.updation == `"Updated"`) {
              // alert("Password changed")
              this.background="bg-trans"
              this.animatePopup("Password Updated Successful");
              setTimeout(
                () => {
                  this.router.navigate(['/userAuth/login']);
                },3000
              )
            }
          })

      } else {
        this.background="bg-red"
        this.animatePopup("New Password and Confirm password does not match");
        // this.router.navigate(['/userAuth/login']);
      }
  }
  send() {
    this.router.navigate(['/Login/otp']);
  }
  sendOtp() {
    this.ds.sendOtp(this.email).subscribe((res: any) => {
      this.otpfromspring = res
      console.log(this.otpfromspring);
      this.isforget = true;
    })
  }
  otpValidation() {
    if (this.otpfromspring == this.otpfromuser) {
      this.isReset = true;
      this.isCorrectVerification = true;
    }
    else {
      this.isReset = false;
      this.isCorrectVerification = false;
    }
    console.log(this.isCorrectVerification + " " + this.isReset + " " + this.isforget)
  }
  // getForget(){
  //   this.emailid=this.email.email;
  //   this.isforget=true;
  //   console.log(this.emailid)
  // }
  getReset() {
    this.email = this.email;
    this.isReset = true;
    console.log(this.email)
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
}
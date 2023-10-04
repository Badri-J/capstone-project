import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/userservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', '../user-auth.component.css']
})
export class LoginPageComponent implements OnInit
{
  model:any={};
  getData:any;
  constructor(private userservice:UserserviceService,private router:Router)
  {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginUser(){
    console.log("loginUser button works")
    var user=this.model.username;
    var password=this.model.password;

    this.userservice.getUserData(user,password).subscribe((res:any)=>{
      this.getData=res;
      alert(this.getData)

      if(this.getData==true)
      {
        this.router.navigate(["/home"]);
      }
      else
      {
        alert("Invalid User");
      }
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent {
  constructor(private userAccess:UserAuthService, private router:Router){
  }
  employee:Employee = this.userAccess.getLoggedInEmployee()

  isLoggedIn(){
		if(localStorage.getItem('loginState') == "true"){
			return true;
		}else{
			return false;
		}
	}

  logout(){
    this.userAccess.setLoginState("false")
    this.router.navigate(['/userAuth'])
  }
}

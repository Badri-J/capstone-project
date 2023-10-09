import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/Service/user-auth.service';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})

export class AdminAccessComponent {
	sideBarStatus:any = 'show'
	showButton:any =  'hide'
	width:any = 'increaseWidth'
	btnWidth:any = 'incWidth';
	constructor(private userAuthService:UserAuthService, private router:Router){

	}
	hideBar(){
		this.sideBarStatus = 'hide'
		this.showButton = 'show'
		this.width ='decreaseWidth'
		this.btnWidth = 'decWidth'
	}
	showBar(){
		this.showButton = 'hide'
		this.sideBarStatus = 'show'
		this.width ='increaseWidth'
		this.btnWidth = 'incWidth'
	}
	isLoggedIn(){
		if(localStorage.getItem('loginState') == "true"){
			return true;
		}else{
			return false;
		}
	}
	logout(){
		localStorage.removeItem('loggedInEmployee')
		this.userAuthService.setLoginState("false")
		this.router.navigate(['/userAuth'])
	}
}

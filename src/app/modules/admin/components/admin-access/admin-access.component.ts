import { Component } from '@angular/core';

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
}

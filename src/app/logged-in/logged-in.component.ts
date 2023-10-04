import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})

export class LoggedInComponent {
	sideBarStatus:any = 'show'
	showButton:any =  'hide'
	width:any = 'increaseWidth'
	hideBar(){
		this.sideBarStatus = 'hide'
		this.showButton = 'show'
		this.width ='decreaseWidth'
		 
	}
	showBar(){
		this.showButton = 'hide'
		this.sideBarStatus = 'show'
		this.width ='increaseWidth'
	}
}



import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/Service/user-auth.service';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private userAuth:UserAuthService){

  }
  employee:Employee = this.userAuth.getLoggedInEmployee()
}

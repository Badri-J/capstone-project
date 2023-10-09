import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';

@NgModule({
  declarations: [
    AdminAccessComponent,
    DashboardComponent,
    ManageEmployeeComponent,
    NotLoggedInComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }

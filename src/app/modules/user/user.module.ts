import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserAccessComponent } from './user-access/user-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotLogedInComponent } from './not-loged-in/not-loged-in.component';

@NgModule({
  declarations: [
    UserAccessComponent,
    DashboardComponent,
    NotLogedInComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

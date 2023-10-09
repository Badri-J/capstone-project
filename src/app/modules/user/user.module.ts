import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAccessComponent } from './user-access/user-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestDeviceComponent } from './request-device/request-device.component';
import { NotLogedInComponent } from './not-loged-in/not-loged-in.component';


@NgModule({
  declarations: [
    UserAccessComponent,
    DashboardComponent,
    RequestDeviceComponent,
    NotLogedInComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

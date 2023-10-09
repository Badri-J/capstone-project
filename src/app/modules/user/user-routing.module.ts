import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessComponent } from './user-access/user-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestDeviceComponent } from './request-device/request-device.component';

const routes: Routes = [
  {path:'',component:UserAccessComponent,
  children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'requestDevice', component:RequestDeviceComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

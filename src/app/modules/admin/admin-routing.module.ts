import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { ManageDeviceComponent } from './components/manage-device/manage-device.component';
import { ManageSoftwareComponent } from './components/manage-software/manage-software.component';
import { ManageLicenseComponent } from './components/manage-license/manage-license.component';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';

const routes: Routes = [
  {path:'', component:AdminAccessComponent,
  children:[
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'employees', component:ManageEmployeeComponent},
    {path:'devices', component:ManageDeviceComponent},
    {path:'softwares', component:ManageSoftwareComponent},
    {path:'licenses', component:ManageLicenseComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

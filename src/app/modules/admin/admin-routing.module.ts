import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { ManageDeviceComponent } from './components/manage-device/manage-device.component';
import { ManageSoftwareComponent } from './components/manage-software/manage-software.component';
import { ManageLicenseComponent } from './components/manage-license/manage-license.component';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { UpdateEmployeeComponent } from './components/manage-employee/update-employee/update-employee.component';
import { UpdateDeviceComponent } from './components/manage-device/update-device/update-device.component';
import { UpdateSoftwareComponent } from './components/manage-software/update-software/update-software.component';
import { UpdateLicenseComponent } from './components/manage-license/update-license/update-license.component';

const routes: Routes = [
  {path:'', component:AdminAccessComponent,
  children:[
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'employees', component:ManageEmployeeComponent,
    children:[
      {path:'updateEmployee/:id', component:UpdateEmployeeComponent}
    ]},
    {path:'devices', component:ManageDeviceComponent,
    children:[
      {path:'updateDevice/:id', component:UpdateDeviceComponent}
    ]},
    {path:'softwares', component:ManageSoftwareComponent,
  children:[
    {path:'updateSoftware/:id', component:UpdateSoftwareComponent}
  ]},
    {path:'licenses', component:ManageLicenseComponent,
  children:[
    {path:'updateLicense/:id', component:UpdateLicenseComponent}
  ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

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
import { InventoryComponent } from './components/inventory/inventory.component';
import { AssignDevicesComponent } from './components/inventory/assign-devices/assign-devices.component';
import { AssignSoftwaresComponent } from './components/inventory/assign-softwares/assign-softwares.component';
import { AssignLicensesComponent } from './components/inventory/assign-licenses/assign-licenses.component';
import { EmployeeDetailsComponent } from './components/manage-employee/employee-details/employee-details.component';
import { EmailComponentComponent } from './components/dashboard/email-component/email-component.component';
import { LogsComponent } from './components/logs/logs.component';
import { RequestsComponent } from './components/requests/requests.component';

const routes: Routes = [
  {path:'', component:AdminAccessComponent,
  children:[
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'logs',component:LogsComponent},
    {path:'requests', component:RequestsComponent},
    {path:'dashboard', component:DashboardComponent,
    children:[
      {path:'email/:id',component:EmailComponentComponent}
    ]},
    {path:'inventory', component:InventoryComponent,
    children:[
      {path:'',redirectTo:'assignDevices', pathMatch:'full'},
      {path:'assignDevices',component:AssignDevicesComponent},
      {path:'assignSoftwares',component:AssignSoftwaresComponent},
      {path:'assignLicenses',component:AssignLicensesComponent},
    ]},
    {path:'employees', component:ManageEmployeeComponent,
    children:[
      {path:'employeeDetails/:id',component:EmployeeDetailsComponent},
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

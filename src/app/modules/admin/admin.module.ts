import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAccessComponent } from './components/admin-access/admin-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { UpdateEmployeeComponent } from './components/manage-employee/update-employee/update-employee.component';
import { ManageDeviceComponent } from './components/manage-device/manage-device.component';
import { UpdateDeviceComponent } from './components/manage-device/update-device/update-device.component';
import { UpdateSoftwareComponent } from './components/manage-software/update-software/update-software.component';
import { ManageSoftwareComponent } from './components/manage-software/manage-software.component';
import { ManageLicenseComponent } from './components/manage-license/manage-license.component';
import { UpdateLicenseComponent } from './components/manage-license/update-license/update-license.component';

@NgModule({
    declarations: [
        AdminAccessComponent,
        DashboardComponent,
        ManageEmployeeComponent,
        ManageSoftwareComponent,
        ManageDeviceComponent,
        ManageLicenseComponent,
        NotLoggedInComponent,
        SearchFilterPipe,
        UpdateEmployeeComponent,
        UpdateDeviceComponent,
        UpdateSoftwareComponent,
        UpdateLicenseComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class AdminModule { }

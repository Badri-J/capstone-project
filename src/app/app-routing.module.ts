import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ForgotPassComponent } from './user-auth/forgot-pass/forgot-pass.component';
import { LoginPageComponent } from './user-auth/login-page/login-page.component';
import { SignUpComponent } from './user-auth/sign-up/sign-up.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { ManageEmployeeComponent } from './logged-in/manage-employee/manage-employee.component';
import { DashboardComponent } from './logged-in/dashboard/dashboard.component';
import { ManageDeviceComponent } from './logged-in/manage-device/manage-device.component';
import { ManageLicenseComponent } from './logged-in/manage-license/manage-license.component';
import { ManageSoftwareComponent } from './logged-in/manage-software/manage-software.component';


  const routes: Routes = [
    {path:'', redirectTo:'userAuth', pathMatch:'full'},
  {path: 'userAuth' , component:UserAuthComponent,
  children:[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginPageComponent },
    {path:'forgotPass', component:ForgotPassComponent},
    {path:'signUp', component:SignUpComponent}
  ] 
  },
  {path: 'loggedIn', component:LoggedInComponent,
  children:[
    {path:'', redirectTo: 'dashboard', pathMatch:'full'},
    {path:'dashboard', component: DashboardComponent },
    {path:'manageEmployee', component: ManageEmployeeComponent},
    {path:'manageDevice', component: ManageDeviceComponent},
    {path:'manageLicense', component: ManageLicenseComponent},
    {path:'manageSoftware', component: ManageSoftwareComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

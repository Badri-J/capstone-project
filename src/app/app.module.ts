import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ForgotPassComponent } from './user-auth/forgot-pass/forgot-pass.component';
import { LoginPageComponent } from './user-auth/login-page/login-page.component';
import { SignUpComponent } from './user-auth/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthService } from './Service/user-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { DashboardComponent } from './logged-in/dashboard/dashboard.component';
import { ManageDeviceComponent } from './logged-in/manage-device/manage-device.component';
import { ManageSoftwareComponent } from './logged-in/manage-software/manage-software.component';
import { ManageLicenseComponent } from './logged-in/manage-license/manage-license.component';
import { ManageEmployeeComponent } from './logged-in/manage-employee/manage-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    ForgotPassComponent,
    LoginPageComponent,
    SignUpComponent,
    LoggedInComponent,
    DashboardComponent,
    ManageDeviceComponent,
    ManageSoftwareComponent,
    ManageLicenseComponent,
    ManageEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

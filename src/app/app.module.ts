import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthService } from './Service/user-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPassComponent } from './components/user-auth/forgot-pass/forgot-pass.component';
import { LoginPageComponent } from './components/user-auth/login-page/login-page.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    LoginPageComponent,
    SignUpComponent,
    ForgotPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AdminModule
  ],
  exports:[FormsModule],
  providers: [UserAuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }

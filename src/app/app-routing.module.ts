import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ForgotPassComponent } from './user-auth/forgot-pass/forgot-pass.component';
import { LoginPageComponent } from './user-auth/login-page/login-page.component';
import { SignUpComponent } from './user-auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';


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
  {path: 'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPassComponent } from './components/user-auth/forgot-pass/forgot-pass.component';
import { LoginPageComponent } from './components/user-auth/login-page/login-page.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';


  const routes: Routes = [
    {path:'', redirectTo:'userAuth', pathMatch:'full'},
    {path: 'userAuth' , component:UserAuthComponent,
    children:[
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', component:LoginPageComponent },
      {path:'forgotPass', component:ForgotPassComponent},
      {path:'signUp', component:SignUpComponent},
    ]}, 
    {
      path: 'admin',
      loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

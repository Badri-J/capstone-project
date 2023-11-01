import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccessComponent } from './user-access/user-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {path:'',component:UserAccessComponent,
  children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'requests', component:RequestsComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

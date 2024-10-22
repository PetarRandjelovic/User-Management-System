import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {EdituserComponent} from "./edituser/edituser.component";
import { CreateuserComponent } from './createuser/createuser.component';
import { ReadGuard } from './read.guard';
import { CreateGuard } from './create.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { AllGuard } from './all.guard';

const routes: Routes = [


  {

    path: "users",
    component: UserComponent,
    
    canActivate: [ReadGuard],
    
},
{

  path: "welcome",
  component: WelcomeComponent,
  canActivate: [AllGuard],
},

{

  path: "login",
  component: LoginComponent,
 // 
},
{

  path: "edituser/:id",
  component: EdituserComponent,

},
{

  path: "createuser",
  component: CreateuserComponent,
  canActivate: [CreateGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from './components/home/home.component';
import {ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {TodoComponent} from './components/todo/todo.component';


import {AuthguardService} from './services/authguard.service';


const routes: Routes = [
  {path: '', redirectTo: 'users/signin', pathMatch: 'full'},
  {path: 'users/signin', component: SigninComponent},
  {path: 'users/signup', component: SignupComponent},
  {path: 'users/forget-password', component: ForgetpasswordComponent},
  {path: 'users/reset-password', component: ResetpasswordComponent},
  {
    path: 'users/home',
    component: HomeComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'todo/create',
    component: TodoComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'todo/edit/:id',
    component: TodoComponent,
    canActivate: [AuthguardService]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

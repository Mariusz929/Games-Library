import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {AccessForbiddenComponent} from "./access-forbidden/access-forbidden.component";
import {AuthGuard} from "./core/auth.guard";


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    canActivate: [AuthGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'access-denied', component: AccessForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

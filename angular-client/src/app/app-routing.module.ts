import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./component/user/user.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {AccessForbiddenComponent} from "./component/access-forbidden/access-forbidden.component";
import {AuthGuard} from "./core/auth.guard";
import {GameListComponent} from "./component/game-list/game-list.component";
import {GamePageComponent} from "./component/game-page/game-page.component";
import {TutorialPageComponent} from "./component/tutorial-page/tutorial-page.component";
import {TutorialListComponent} from "./component/tutorial-list/tutorial-list.component";

const routes: Routes = [
  {
    path: 'users', component: UserComponent,
    canActivate: [AuthGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {path: 'games', component: GameListComponent},
  {path: 'tutorials', component: TutorialListComponent},
  {path: 'my-games', component: GameListComponent},
  {path: 'upcoming', component: GameListComponent},
  {path: 'game/:id', component: GamePageComponent},
  {path: 'tutorial/:id', component: TutorialPageComponent},
  {path: 'register', component: RegisterComponent},
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

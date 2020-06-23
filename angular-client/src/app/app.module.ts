import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './core/auth.service';
import {Interceptor} from './core/interceptor';
import {TokenStorage} from './core/token.storage';
import {LoginComponent} from './component/login/login.component';
import {UserService} from './service/user.service';
import {UserComponent} from './component/user/user.component';
import {ToastrModule} from 'ngx-toastr';
import {AccessForbiddenComponent} from './component/access-forbidden/access-forbidden.component';
import {RegisterComponent} from './component/register/register.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import { GameListComponent } from './component/game-list/game-list.component';
import {GameService} from "./service/game.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AccessForbiddenComponent,
    RegisterComponent,
    NavbarComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, AuthService, TokenStorage, TokenStorage, GameService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

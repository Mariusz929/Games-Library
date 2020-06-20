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
import {LoginComponent} from './login/login.component';
import {UserService} from './user/user.service';
import {UserComponent} from './user/user.component';
import {ToastrModule} from 'ngx-toastr';
import {AccessForbiddenComponent} from './access-forbidden/access-forbidden.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AccessForbiddenComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService, AuthService, TokenStorage, TokenStorage,
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

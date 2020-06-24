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
import {GameListComponent} from './component/game-list/game-list.component';
import {GameService} from "./service/game.service";
import {ContactModalComponent} from './component/contact-modal/contact-modal.component';
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "./service/message.service";
import {GamePageComponent} from './component/game-page/game-page.component';
import {TableService} from "./service/table.service";
import {UserEditModalComponent} from './component/user-edit-modal/user-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AccessForbiddenComponent,
    RegisterComponent,
    NavbarComponent,
    GameListComponent,
    ContactModalComponent,
    GamePageComponent,
    UserEditModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule,
    NgbModule,
  ],
  providers: [ContactModalComponent, UserEditModalComponent, MessageService, UserService, AuthService, TokenStorage, TokenStorage, GameService, TableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserEditModalComponent
  ]
})

export class AppModule {
}

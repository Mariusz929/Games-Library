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
import {GameEditModalComponent} from './component/game-edit-modal/game-edit-modal.component';
import {FavoriteButtonComponent} from './component/favorite-button/favorite-button.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FavoriteService} from "./service/favorite.service";
import {RatingComponent} from './component/rating/rating.component';
import {RateService} from "./service/rate.service";
import {ReviewService} from "./service/review.service";
import {TutorialAddModalComponent} from './component/tutorial-add-modal/tutorial-add-modal.component';
import {TutorialService} from "./service/tutorial.service";
import { TutorialPageComponent } from './component/tutorial-page/tutorial-page.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { TutorialListComponent } from './component/tutorial-list/tutorial-list.component';

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
    GameEditModalComponent,
    FavoriteButtonComponent,
    RatingComponent,
    TutorialAddModalComponent,
    TutorialPageComponent,
    TutorialListComponent,
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
    MatIconModule,
    MatButtonModule,
    PdfViewerModule
  ],
  providers: [ContactModalComponent, TutorialAddModalComponent, UserEditModalComponent, GameEditModalComponent, TutorialService, ReviewService, RateService, FavoriteService, MessageService, UserService, AuthService, TokenStorage, TokenStorage, GameService, TableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserEditModalComponent,
    GameEditModalComponent,
    TutorialAddModalComponent
  ]
})

export class AppModule {
}

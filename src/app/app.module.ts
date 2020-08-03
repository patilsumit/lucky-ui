import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from './components/home/home.component';

import {BackendApisService} from './services/backend-apis.service';
import {AuthguardService} from './services/authguard.service';

import {MustMatchDirective} from './_helpers/must-match.directive';
import {ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {TodoComponent} from './components/todo/todo.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    MustMatchDirective,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ BackendApisService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupPageComponent } from './components/auth/signup-page/signup-page.component';
import { SignupFormComponent } from './components/auth/signup-page/signup-form/signup-form.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { LoginFormComponent } from './components/auth/login-page/login-form/login-form.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { MyBooksComponent } from './components/books/my-books/my-books.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupPageComponent,
    SignupFormComponent,
    LoginPageComponent,
    LoginFormComponent,
    AllBooksComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

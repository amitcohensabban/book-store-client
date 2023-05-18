import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupPageComponent } from './components/auth/signup-page/signup-page.component';
import { SignupFormComponent } from './components/auth/signup-page/signup-form/signup-form.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { LoginFormComponent } from './components/auth/login-page/login-form/login-form.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { MyBooksComponent } from './components/books/my-books/my-books.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginPageComponent } from './components/auth/admin-login-page/admin-login-page.component';
import { BooksComponent } from './components/books/books/books.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { UpdatePrivateDetailsComponent } from './components/auth/update-private-details/update-private-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupPageComponent,
    SignupFormComponent,
    LoginPageComponent,
    LoginFormComponent,
    AllBooksComponent,
    MyBooksComponent,
    AdminLoginPageComponent,
    BooksComponent,
    ShoppingCartComponent,
    AddBookComponent,
    UpdatePrivateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule,NgxPaginationModule
  ],
  providers: [HttpClient,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

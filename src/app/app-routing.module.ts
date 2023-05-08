import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { SignupPageComponent } from './components/auth/signup-page/signup-page.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { MyBooksComponent } from './components/books/my-books/my-books.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'sign-up',component:SignupPageComponent},
  {path:'all-books',component:AllBooksComponent},
  {path:'my-books',component:MyBooksComponent},
  { path: '', redirectTo: 'all-books', pathMatch: 'full' },
  { path: '**', redirectTo: 'all-books' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

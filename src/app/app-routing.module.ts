import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { SignupPageComponent } from './components/auth/signup-page/signup-page.component';
import { AllBooksComponent } from './components/books/all-books/all-books.component';
import { MyBooksComponent } from './components/books/my-books/my-books.component';
import { AdminLoginPageComponent } from './components/auth/admin-login-page/admin-login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AddBookComponent } from './components/books/add-book/add-book.component';
import { UpdatePrivateDetailsComponent } from './components/auth/update-private-details/update-private-details.component';

const routes: Routes = [
  {path:'login',component:LoginPageComponent},
  {path:'sign-up',component:SignupPageComponent},
  {path:'all-books',component:AllBooksComponent},
  {path:'my-books',component:MyBooksComponent,canActivate:[AuthGuard]},
  {path:'admin-login',component:AdminLoginPageComponent},
  {path:"cart",component:ShoppingCartComponent},
  {path:'admin-add-book',component:AddBookComponent},
  {path:'update-private-details',component:UpdatePrivateDetailsComponent},
  { path: '', redirectTo: 'all-books', pathMatch: 'full' },
  { path: '**', redirectTo: 'all-books' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

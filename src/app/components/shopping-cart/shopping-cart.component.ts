import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: any = [];
  userId: string = '';
  selectedBook:any;
  totalPrice:number=0;
  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private auth: AuthService
  ) {}
  public ngOnInit(): void {
    const userEmail = localStorage.getItem('userName');
    this.auth.getUserIdByEmail(userEmail).subscribe((response) => {
      this.userId = response.userId;
      this.cartService.getCart(this.userId).subscribe((cart) => {
        this.cart = cart;
        console.log(this.cart);
      });
    });
    this.totalPrice = parseInt(localStorage.getItem('price') || '0');
  }

  public addBookToCart(userId: string, bookId: string): void {
    this.cartService
      .addBookToCart(userId, bookId)
      .subscribe((cart) => (this.cart = cart));
      localStorage.setItem('price',this.cart.totalPrice.toString());
      this.totalPrice = parseInt(localStorage.getItem('price') || '0');
  }




  public removeBookFromCart(bookId: string): void {
    this.cartService.removeBookFromCart(this.userId, bookId).subscribe((cart) => {
      this.cart = cart;
      localStorage.setItem('price', this.cart.totalPrice.toString());
      this.totalPrice = parseInt(localStorage.getItem('price') || '0');
    });
  }






  public checkout(): void {
    this.cartService.checkout(this.userId).subscribe(() => (this.cart = null));
    this.router.navigate(['/my-books']);
  }
}

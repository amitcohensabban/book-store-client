import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart:any[]=[];
  constructor(   private cartService: ShoppingCartService,private auth:AuthService) { }
  public ngOnInit(): void {
    const userId = this.auth.getUserIdByEmail(localStorage.getItem('userName'));
  }

  public addBookToCart(userId: string, bookId: string): void {
    this.cartService.addBookToCart(userId, bookId).subscribe(cart => this.cart = cart);
  }

  // public removeBookFromCart(userId: string, bookId: string): void {
  //   this.cartService.removeBookFromCart(userId, bookId).subscribe(cart => this.cart = cart);
  // }

  // public checkout(userId: string): void {
  //   this.cartService.checkout(userId).subscribe(() => this.cart = null);
  // }
  }

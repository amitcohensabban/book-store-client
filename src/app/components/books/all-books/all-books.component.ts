import { Component,OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  books: any;
  constructor(private bookService:BooksService,private cart :ShoppingCartService){}
  async ngOnInit() {
    try {
      const books = await this.bookService.getAllBooks().toPromise();
      this.books = books;
      console.log(this.books);
    } catch (error) {
      console.log(error);
    }
  }

  public addBookToCart(userId: string, bookId: string): void {
    this.cart.addBookToCart(userId, bookId)
      .subscribe(response => {
        console.log(response);
        localStorage.setItem('price',response.totalPrice.toString());

      });
  }
  }

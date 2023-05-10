import { Component,OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  books: any;
  token: any = localStorage.getItem('token');
  constructor(private bookService:BooksService){}
  async ngOnInit() {
    try {
      const books = await this.bookService.getMyBooks(this.token).toPromise();
      this.books = books;
      console.log(this.books);
    } catch (error) {
      console.log(error);
    }
  }

}

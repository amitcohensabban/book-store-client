import { Component,OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  books: any;
  constructor(private bookService:BooksService){}
  async ngOnInit() {
    try {
      const books = await this.bookService.getAllBooks().toPromise();
      this.books = books;
      console.log(this.books);
    } catch (error) {
      console.log(error);
    }
  }
  }

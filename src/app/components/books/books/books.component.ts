import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input() books: any[];
  filteredBooks: any[];
  searchTerm: string;
  p: number = 1;
  selectedBook: any;
  selectedBookCart: any;
  searchBooks: any[];

  @Output() bookAdded = new EventEmitter<{ userId: string; bookId: string }>();

  ngOnInit(): void {
    setTimeout(() => {
      this.filteredBooks = this.books;
      this.searchBooks = this.books;
    }, 1200);
  }

  constructor(private auth: AuthService) {
    this.books = [];
    this.filteredBooks = [];
    this.searchTerm = '';
    this.searchBooks = [];
  }

  filterBooks(): void {
    this.filteredBooks = this.searchBooks.filter((book) =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  selectBook(book: any): void {
    this.selectedBook = book;
  }

  public async addToCart(bookId: string): Promise<void> {
    console.log('selectedBook:', this.selectedBook);
    const userEmail = localStorage.getItem('userName');
    try {
      const userId: any = await this.auth
        .getUserIdByEmail(userEmail)
        .toPromise();
      console.log('response from getUserIdByEmail:', userId.userId);

      this.bookAdded.emit({ userId: userId.userId, bookId });
    } catch (error) {
      console.log(this.bookAdded);

      console.error(error);
    }
  }
}

import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{
  @Input() books:any[]
  filteredBooks: any[];
  searchTerm: string;
  p: number = 1;
   ngOnInit(): void {
    setTimeout(() => {
          this.filteredBooks = this.books;

    },1200)
  }

  constructor() {
    this.books = [];
    this.filteredBooks = [];
    this.searchTerm = '';
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredBooks);
  }

}

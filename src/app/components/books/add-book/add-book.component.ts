import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addBookForm!: FormGroup;

  constructor(private bookService:BooksService,private fb: FormBuilder,private authService: AuthService) {}

  ngOnInit() {
    this.addBookForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      authorId: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
    });
  }


  onSubmit(): void {
    if (this.addBookForm.invalid) {
      return;
    }

    const newBook = {
      title: this.addBookForm.get('title')?.value,
      description: this.addBookForm.get('description')?.value,
      authorId: this.addBookForm.get('authorId')?.value,
      price: this.addBookForm.get('price')?.value,
    };

    this.bookService.addBook(newBook).subscribe(
      response => {
        console.log('Book added successfully:', response);
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }}

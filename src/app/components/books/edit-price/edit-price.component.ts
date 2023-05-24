import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent {
  priceForm!: FormGroup;

  constructor(private router:Router, private fb: FormBuilder, private bookService:BooksService) {}

  ngOnInit(): void {
    this.priceForm = this.fb.group({
      price: this.fb.control('', Validators.required),
      bookId: this.fb.control('', Validators.required)
    });
  }

  handleSubmit(): void {
    if (this.priceForm.valid) {
      const price: number = this.priceForm.get('price')?.value;
      const bookId: string = this.priceForm.get('bookId')?.value;

      this.bookService.updateBookPrice(bookId, price)
        .subscribe(
          (res: any) => {
            console.log('Book price updated successfully:', res);
            this.router.navigate(['all-books'])
          },
          (error: any) => {
            console.error('Error updating book price:', error);
          }
        );
    } else {
      console.log('Invalid form data');
    }
  }

}

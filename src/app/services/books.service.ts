import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(  private http:HttpClient,private router:Router,private auth:AuthService) { }

  getAllBooks(): Observable<any[]> {
    return  this.http.get<any[]>(`${environment.serverUrl}Books`);
  }

  getMyBooks(token: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverUrl}Books/users/${localStorage.getItem('userName')}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addBook(newBook: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${environment.serverUrl}Books`, newBook, {
      headers: headers
    });
  }

  updateBookPrice(bookId: string, newPrice: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.serverUrl}Books/${bookId}?price=${newPrice}`;
    return this.http.patch<any>(url, null, {
      headers: headers
    });
  }
}



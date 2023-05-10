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


}



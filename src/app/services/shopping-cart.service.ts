import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart: any[] = [];

  constructor(private http: HttpClient) { }
  public getCart(userId:string): Observable<any> {
    console.log(userId);

    return this.http.get(`${environment.serverUrl}Cart/user/${userId}`);
  }
  public addBookToCart(userId: string, bookId: string): Observable<any> {
    return this.http.post(`${environment.serverUrl}Cart/add?userId=${userId}&bookId=${bookId}`, { userId, bookId });
  }
  public removeBookFromCart(userId: string, bookId: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}Cart/remove?userId=${userId}&bookId=${bookId}`, { params: { userId, bookId } });
  }
  public checkout(userId: string): Observable<void> {
    return this.http.post<void>(`${environment.serverUrl}/checkout`, { userId });
  }
}

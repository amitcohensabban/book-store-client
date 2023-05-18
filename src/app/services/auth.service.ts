import { Injectable } from '@angular/core';
import { from, BehaviorSubject, Observable, tap, map,switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HeaderComponent } from '../components/header/header.component';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >('');

  token: Observable<string | null> = this._token.asObservable();
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {}

  signUp(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<{ token: string; email: string; password: string }> {
    return this.http.post(`${environment.serverUrl}AppUser/signUp`, data).pipe(
      map((res: any) => {
        const token: string = res.token;
        const email: string = data.email;
        const password: string = data.password;
        return { token, email, password };
      })
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${environment.serverUrl}AppUser/login`, data).pipe(
      tap((res: any): void => {
        const token: string = res.token;
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', data.email);
        this.setToken(token);
        this.checkIsUserAdmin(data.email);
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/my-books']);
      })
    );
  }
  setToken(value: string) {
    this._token.next(value);
  }
  async checkIsUserAdmin(email: string): Promise<boolean> {
    console.log(`Checking if user ${email} is an admin...`);

    try {
      const res: any = await this.http
        .get<boolean>(`${environment.serverUrl}AppUser/Admin?email=${email}`)
        .toPromise();
      await this.isUserAdmin.next(res);
      console.log(res);
      localStorage.setItem('Admin', res + '');
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getUserIdByEmail(email: string | null): Observable<{ userId: string }> {
    return this.http.get<{ userId: string }>(
      `${environment.serverUrl}AppUser?email=${email}`
    );
  }
  updatePrivateDetails(details: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.patch(
      `${environment.serverUrl}AppUser/updateDetails`,
      details,
      { headers }
    );
  }
  deleteAccount(email: string|null): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );

    return this.getUserIdByEmail(email).pipe(
      switchMap((response) => {
        const userId = response.userId;
        if (!userId) {
          return throwError('User ID not found.');
        }
         return this.http.delete<string>(
          `${environment.serverUrl}AppUser/delete?userId=${userId}`,{headers}
          ).pipe(
            tap(() => {
               this.router.navigate(['/all-books']);
              localStorage.clear();
              setTimeout(() => {
                window.location.reload(); 
              }, 1000);            })
          );
        ;
      })
    );
  }
}




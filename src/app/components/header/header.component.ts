import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isUserLoggedIn.subscribe((newStatus) => {
      this.isUserLoggedIn = newStatus;
    });
    if (localStorage.getItem('token')) {
      this.auth.isUserLoggedIn.next(true);
    }
  }
  logOut(): void {
    this.auth.setToken('');
    this.auth.isUserLoggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/all-books']);
  }
}

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
  isUserAdmin:boolean=false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isUserLoggedIn.subscribe((newStatus) => {
      this.isUserLoggedIn = newStatus;
    });
    this.auth.isUserAdmin.subscribe((isAdmin: boolean) => {
      this.isUserAdmin=isAdmin;
    });

    if (localStorage.getItem('token')) {
      this.auth.isUserLoggedIn.next(true);
    }
  }
  logOut(): void {
    this.auth.setToken('');
    this.auth.isUserLoggedIn.next(false);
    this.auth.isUserAdmin.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('Admin');
    localStorage.removeItem('userName');
    this.router.navigate(['/all-books']);
  }
}

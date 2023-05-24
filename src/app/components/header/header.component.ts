import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  isUserAdmin: boolean = false;
  userName!: string | null;
  price!: any;
  private detectChangesInterval: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.auth.isUserLoggedIn.subscribe((newStatus) => {
      this.isUserLoggedIn = newStatus;
    });
    this.auth.isUserAdmin.subscribe((isAdmin: boolean) => {
      this.isUserAdmin = isAdmin;
    });

    if (localStorage.getItem('token')) {
      this.auth.isUserLoggedIn.next(true);
    }
    this.userName = localStorage.getItem('userName');
    this.price = parseFloat(localStorage.getItem('price') || '0');
    console.log(this.price);

    this.startPriceChangeDetection();
  }

  ngOnDestroy(): void {
    this.stopPriceChangeDetection();
  }

  logOut(): void {
    this.auth.setToken('');
    this.auth.isUserLoggedIn.next(false);
    this.auth.isUserAdmin.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('Admin');
    localStorage.removeItem('userName');
    localStorage.removeItem('price');

    this.router.navigate(['/all-books']);
  }

  private startPriceChangeDetection(): void {
    this.cdr.detach();

    const detectChanges = () => {
      this.price = parseFloat(localStorage.getItem('price') || '0');
      this.cdr.detectChanges();
    };

    this.detectChangesInterval = setInterval(detectChanges, 1000);
  }

  private stopPriceChangeDetection(): void {
    clearInterval(this.detectChangesInterval);
  }
}

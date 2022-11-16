import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showMobileHeader = false;
  cartCount: any;
  user$ = this.authService.currentUser$;
  constructor(private firebase: FirebaseService,
    public authService: AuthenticationService,) {}

  ngOnInit(): void {
    this.firebase.getCartCount().subscribe((value) => (this.cartCount = value));
    console.log(this.cartCount)
  }
  logout() {
    this.authService.logout();
  }
}

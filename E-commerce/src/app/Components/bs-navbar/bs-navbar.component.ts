import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app.user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from '../../services/auth.service';
import { shoppingCart } from 'src/app/models/shoppingCart';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser
cart$: Observable<shoppingCart>
  
  constructor(private auth: AuthService, private shoppingcartservice: ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingcartservice.getCart();
    
  }

  Logout() {
    this.auth.logout();
  }
}

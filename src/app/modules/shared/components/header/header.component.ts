import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartSize$: Observable<number>;
  installEvent = null;

  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartSize$ = this.cartService.cart$.pipe(map(products => products.length));
  }

  // Si la aplicación no esta instalada lanza el evento.
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoise.then(response => {
        console.log(response);
      });
    }
  }

}

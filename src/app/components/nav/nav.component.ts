import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service'; // Inyectar el servicio del carrito
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit {
  currentUser: any;
  role: string | null = null;
  totalItems: number = 0; // Almacenar el número total de elementos en el carrito

  constructor(
    private authService: AuthService,
    private cartService: CartService // Inyectar el servicio de carrito
  ) {}

  ngOnInit() {
    this.checkUserRole();
    this.getCartItemCount(); // Llamar al método para obtener el total de elementos en el carrito
  }

  ngAfterViewInit() {
    let menu = document.querySelector('#menu-icon') as HTMLElement;
    let navbar = document.querySelector('.navbar') as HTMLElement;

    if (menu && navbar) {
      menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
      };
    }
  }

  // Método para verificar el rol del usuario
  checkUserRole() {
    this.authService.getCurrentUser().subscribe(async (user) => {
      this.currentUser = user;

      if (user) {
        this.role = await this.authService.getUserRole();
      } else {
        this.role = null;
      }
    });
  }

  // Método para obtener el número de elementos en el carrito
  getCartItemCount() {
    // Obtener el número total de elementos en el carrito desde el CartService
    this.cartService.getCartItems().subscribe(cartItems => {
      this.totalItems = cartItems.length; // Ahora podemos acceder a .length después de recibir los datos
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      alert("Has cerrado sesión exitosamente");
    });
  }
}

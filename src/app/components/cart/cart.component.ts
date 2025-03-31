import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Suscribirse al carrito y obtener los productos añadidos
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  // Eliminar un proyecto del carrito
  removeFromCart(projectId: string) {
    this.cartService.removeFromCart(projectId);
  }

  // Vaciar el carrito
  clearCart() {
    this.cartService.clearCart();
  }

  // Calcular el total del carrito
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  }

  // Realizar la compra
  makePurchase() {
    if (this.cartItems.length > 0) {
      // Vaciar el carrito después de realizar la compra
      this.cartService.clearCart();
      alert('¡Compra exitosa! Gracias por tu compra.');
    } else {
      alert('El carrito está vacío. No puedes realizar una compra.');
    }
  }
}

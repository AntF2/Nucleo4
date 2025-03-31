import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private db = getFirestore();
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    // Cargar el carrito desde el almacenamiento local si existe
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  // Obtener los artículos del carrito como observable
  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  // Agregar un proyecto al carrito
  addToCart(project: any) {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = [...currentCart, project];
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);  // Guardar en localStorage
  }

  // Eliminar un proyecto del carrito
  removeFromCart(projectId: string) {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== projectId);
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);  // Guardar en localStorage
  }

  // Vaciar el carrito
  clearCart() {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage([]);  // Limpiar localStorage
  }

  // Guardar el carrito en el localStorage
  private saveCartToLocalStorage(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Realizar la compra y guardar en Firestore (historial de compras)
  async completePurchase() {
    const cartItems = this.cartItemsSubject.value;
    if (cartItems.length > 0) {
      try {
        const purchasesCollection = collection(this.db, 'purchases');
        for (let item of cartItems) {
          await addDoc(purchasesCollection, {
            projectTitle: item.title,
            projectPrice: item.price,
            date: new Date(),
          });
        }
        alert("Compra exitosa!");
        this.clearCart(); // Limpiar el carrito después de la compra
      } catch (error) {
        console.error("Error al completar la compra: ", error);
      }
    } else {
      alert("Tu carrito está vacío. Agrega proyectos para comprar.");
    }
  }
}

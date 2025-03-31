import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CoursesService } from '../../services/course.service';
import { UsersService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [FormsModule, CommonModule, ],
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  currentUser: any = null; // Inicializamos como null
  totalCartItems: number = 0;
  totalCartPrice: number = 0;
  availableCourses: any[] = [];

  constructor(
    private cartService: CartService,
    private coursesService: CoursesService,
    private userService: UsersService,
    private router: Router // Servicio para obtener el usuario
  ) {}

  ngOnInit() {
    this.loadUserDetails();  // Cargar detalles del usuario
    this.loadCartSummary();  // Cargar resumen del carrito
    this.loadAvailableCourses();  // Cargar cursos disponibles
  }

  // Cargar detalles del usuario
  loadUserDetails() {
    this.currentUser = this.userService.getCurrentUser();  // Obtener el usuario actual
  }

  // Cargar el resumen del carrito
  loadCartSummary() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.totalCartItems = cartItems.length;
      this.totalCartPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    });
  }

  // Cargar cursos disponibles
  loadAvailableCourses() {
    this.coursesService.getCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
  }

  // Inscribirse a un curso
  enrollInCourse(course: any) {
    if (this.currentUser) {
      this.coursesService.enrollInCourse(course, this.currentUser.uid); // Inscribir al usuario en el curso
    } else {
      alert('Debes iniciar sesión para inscribirte a un curso');
    }
  }

  // Ir al carrito de compras
  goToCart() {
    this.router.navigate(['/cart']); // Redirige al carrito
  }
}

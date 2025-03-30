import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Asegúrate de que el servicio esté importado
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: any;
  isAdmin: boolean = false;  // Variable para determinar si el usuario es admin

  constructor(private authService: AuthService) {}

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

  ngOnInit() {
    // Inicializar la verificación del rol
    this.checkUserRole();
  }

  // Método para comprobar el rol del usuario
  checkUserRole() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user; // Obtiene el usuario actual

      // Si hay un usuario autenticado, verificar si es admin
      if (user) {
        this.authService.isAdmin().then(isAdmin => {
          this.isAdmin = isAdmin;  // Establece si es admin
        });
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    alert("Has cerrado sesión exitosamente");
    // Opcionalmente, puedes redirigir al login después de cerrar sesión
    // this.router.navigate(['/login']);
  }
}

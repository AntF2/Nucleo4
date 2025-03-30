import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkUserRole();
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

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      alert("Has cerrado sesión exitosamente");
    });
  }
}

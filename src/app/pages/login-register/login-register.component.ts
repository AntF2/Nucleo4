import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const container = document.getElementById('container');
    const loginBtn = document.getElementById('login');
    const registerBtn = document.getElementById('register');

    if (container && loginBtn && registerBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }

  name: string = '';
  email: string = '';
  password: string = '';
  isLogin: boolean = true; // Cambiar entre login y registro

  constructor(private authService: AuthService) {}

  async onSubmit() {
    try {
      if (this.isLogin) {
        // Intentar hacer login
        await this.authService.login(this.email, this.password);
        // Mostrar alerta de éxito
        alert('¡Inicio de sesión exitoso!');
      } else {
        // Intentar hacer registro
        await this.authService.register(this.email, this.password, this.name);
        // Mostrar alerta de registro exitoso
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        
        // Cambiar a la vista de login después de un registro exitoso
        this.isLogin = true;
      }
    } catch (error) {
      console.error(error);
      // Si hay un error durante el registro o login, manejarlo aquí
      alert('Error al procesar la solicitud. Por favor, intenta de nuevo.');
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}

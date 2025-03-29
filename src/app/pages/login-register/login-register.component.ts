import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [],
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
}

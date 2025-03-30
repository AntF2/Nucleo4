import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta al servicio sea correcta
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      take(1), // Obtener el primer valor emitido y luego completar la suscripción
      map(user => {
        if (user && user.role === 'user') {
          return true; // Si el rol es 'user', permitir el acceso
        } else {
          this.router.navigate(['/login']); // Si no es un usuario regular, redirigir al login
          return false;
        }
      })
    );
  }
}

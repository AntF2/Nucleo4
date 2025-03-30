import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getCurrentUser().pipe(
      take(1), // Obtener el primer valor emitido y luego completar la suscripción
      map(user => {
        if (user && user.role === 'admin') {
          return true; // Si el rol es 'admin', permitir el acceso
        } else {
          this.router.navigate(['/login']); // Si no es admin, redirigir al login
          return false;
        }
      })
    );
  }
}

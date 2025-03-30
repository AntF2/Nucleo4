import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

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
      take(1), // Obtener el primer valor emitido
      switchMap(user => {
        if (user) {
          // Si hay usuario autenticado, obtener su rol desde Firestore
          return this.authService.getUserRole().then(role => {
            if (role === 'admin') {
              return true;
            } else {
              this.router.navigate(['/login']); // Redirigir si no es admin
              return false;
            }
          });
        } else {
          this.router.navigate(['/login']); // Redirigir si no hay usuario autenticado
          return Promise.resolve(false);
        }
      })
    );
  }
}

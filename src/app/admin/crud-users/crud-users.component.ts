import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-crud-users',
  standalone: true,
  imports: [CommonModule], // Necesario para usar el enlace routerLink
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.css'],
})
export class CrudUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    // Obtener usuarios desde el servicio
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Eliminar usuario
  deleteUser(userId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersService.deleteUser(userId);
    }
  }
}

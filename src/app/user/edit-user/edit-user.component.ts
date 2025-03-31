import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { getAuth } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  currentUser: any;
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    const user = getAuth().currentUser;
    if (user) {
      this.currentUser = user;
      this.loadUserData(user.uid);
    }
  }

  // Cargar los datos actuales del usuario
  async loadUserData(uid: string) {
    try {
      const userData = await this.userService.getUserData(uid);
      this.name = userData.name;
      this.email = userData.email;
    } catch (error) {
      this.errorMessage = 'No se pudo cargar los datos del usuario.';
    }
  }

  // Guardar los cambios
  async saveChanges() {
    try {
      await this.userService.updateUser(this.currentUser.uid, this.name, this.email, this.password);
      alert('Datos actualizados correctamente.');
      //dame un mensaje de exito
      this.errorMessage = 'Se actualizaron los datos correctamente.';
    } catch (error) {
      this.errorMessage = 'Error al actualizar los datos.';
    }
  }
}

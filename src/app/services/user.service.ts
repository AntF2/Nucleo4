import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db = getFirestore();
  private usersSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadUsers(); // Cargar usuarios cuando se inicie el servicio
  }

  // Cargar todos los usuarios registrados
  loadUsers() {
    const usersCollection = collection(this.db, 'users');
    getDocs(usersCollection).then((querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.usersSubject.next(users);
    });
  }

  // Obtener usuarios como observable
  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  // Eliminar un usuario
  deleteUser(userId: string) {
    const userDocRef = doc(this.db, 'users', userId);
    deleteDoc(userDocRef)
      .then(() => {
        console.log('Usuario eliminado');
        this.loadUsers(); // Recargar la lista de usuarios
      })
      .catch((error) => {
        console.error('Error al eliminar usuario:', error);
      });
  }
}

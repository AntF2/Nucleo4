import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, updatePassword, User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private db = getFirestore();
  private auth = getAuth();
  private usersSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadUsers(); // Cargar usuarios cuando se inicie el servicio
  }

  // Obtener el usuario actualmente autenticado
  getCurrentUser(): User | null {
    return this.auth.currentUser;
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

  // Obtener los datos de un usuario por su UID
  async getUserData(uid: string): Promise<any> {
    const userDocRef = doc(this.db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('Usuario no encontrado');
    }
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

  // Actualizar los datos de un usuario, manteniendo el rol
  async updateUser(uid: string, name: string, email: string, password: string) {
    const userDocRef = doc(this.db, 'users', uid);

    // Obtener los datos actuales del usuario para conservar el rol
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }

    const currentData = userDoc.data();
    const role = currentData?.['role'];  // Conservamos el rol actual

    // Actualizar solo los campos necesarios, sin sobrescribir el rol
    await setDoc(userDocRef, {
      name,
      email,
      password,
      role,  // No sobrescribir el rol
    });

    // Si se quiere cambiar la contraseña en Firebase Auth
    const user = this.auth.currentUser;
    if (user && password) {
      await updatePassword(user, password);
    }

    // Actualización adicional si es necesario
  }
}

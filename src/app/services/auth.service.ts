import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  // Registrar usuario
  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Crear documento en Firestore con el rol de usuario
      await setDoc(doc(this.db, 'users', user.uid), {
        name: name,
        email: user.email,
        password: password,
        role: 'user',  // Por defecto, se asigna el rol 'user'
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  // Verificar si el usuario es admin
  async isAdmin() {
    const user = this.currentUserSubject.getValue();
    if (user) {
      const userDoc = doc(this.db, 'users', user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return data['role'] === 'admin'; // Verifica si el rol es 'admin'
      }
    }
    return false;
  }

  // Obtener el rol del usuario
  async getUserRole(): Promise<string | null> {
    const user = this.currentUserSubject.getValue();
    if (user) {
      const userDoc = doc(this.db, 'users', user.uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return data['role']; // Retorna el rol del usuario
      }
    }
    return null;
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.auth.signOut();
      this.currentUserSubject.next(null);  // Limpiar el estado del usuario
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  }
}

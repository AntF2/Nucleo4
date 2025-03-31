import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private db = getFirestore();
  private teachersSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadTeachers(); // Cargar profesores al inicio
  }

  // Cargar todos los profesores desde Firestore
  loadTeachers() {
    const teachersCollection = collection(this.db, 'teachers');
    getDocs(teachersCollection).then((querySnapshot) => {
      const teachers: any[] = [];
      querySnapshot.forEach((doc) => {
        teachers.push({ ...doc.data(), id: doc.id });
      });
      this.teachersSubject.next(teachers); // Actualizar la lista de profesores
    });
  }

  // Obtener profesores como observable
  getTeachers() {
    return this.teachersSubject.asObservable();
  }

  // Crear o actualizar un profesor
  async saveTeacher(teacher: any) {
    try {
      if (teacher.id) {
        // Actualizar profesor existente
        const teacherDocRef = doc(this.db, 'teachers', teacher.id);
        await updateDoc(teacherDocRef, {
          name: teacher.name,
          specialization: teacher.specialization,
        });
      } else {
        // Crear nuevo profesor
        const newTeacherRef = await addDoc(collection(this.db, 'teachers'), {
          name: teacher.name,
          specialization: teacher.specialization,
        });

        // Después de crear el profesor, actualizamos el profesor con su ID
        teacher.id = newTeacherRef.id;
      }
    } catch (error) {
      console.error("Error al guardar el profesor: ", error);
    }
  }

  // Eliminar un profesor
  async deleteTeacher(teacherId: string) {
    try {
      const teacherDocRef = doc(this.db, 'teachers', teacherId);
      await deleteDoc(teacherDocRef);
      console.log('Profesor eliminado');
      this.loadTeachers(); // Recargar la lista de profesores
    } catch (error) {
      console.error('Error al eliminar el profesor: ', error);
    }
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Course {
  id?: string;
  image: string;
  title: string;
  description: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseCollection = collection(this.firestore, 'courses');

  constructor(private firestore: Firestore) {}

  // Obtener todos los cursos
  getCourses(): Observable<Course[]> {
    return collectionData(this.courseCollection, { idField: 'id' }) as Observable<Course[]>;
  }

  // Agregar un nuevo curso
  addCourse(course: Course) {
    return addDoc(this.courseCollection, course);
  }

  // Actualizar un curso
  updateCourse(course: Course) {
    const courseDocRef = doc(this.firestore, `courses/${course.id}`);
    return updateDoc(courseDocRef, { ...course });
  }

  // Eliminar un curso
  deleteCourse(courseId: string) {
    const courseDocRef = doc(this.firestore, `courses/${courseId}`);
    return deleteDoc(courseDocRef);
  }
}

import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private db = getFirestore();
  private coursesSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadCourses(); // Cargar cursos al inicio
  }

  // Cargar todos los cursos desde Firestore
  loadCourses() {
    const coursesCollection = collection(this.db, 'courses');
    getDocs(coursesCollection).then((querySnapshot) => {
      const courses: any[] = [];
      querySnapshot.forEach((doc) => {
        courses.push({ ...doc.data(), id: doc.id });
      });
      this.coursesSubject.next(courses); // Actualizar la lista de cursos
    });
  }

  // Obtener cursos como observable
  getCourses() {
    return this.coursesSubject.asObservable();
  }

  // Inscribir a un usuario en un curso
  async enrollInCourse(course: any, userId: string) {
    try {
      // Guardar la inscripción en la colección de "enrollments"
      const enrollmentsCollection = collection(this.db, 'enrollments');
      await addDoc(enrollmentsCollection, {
        courseId: course.id,
        userId: userId, // Agregar el ID del usuario
        courseTitle: course.title,
        coursePrice: course.price
      });
      alert(`¡Felicidades! Te acabas de inscribir al curso: ${course.title}`);
    } catch (error) {
      console.error("Error al inscribir al curso: ", error);
    }
  }

  // Crear o actualizar un curso
  async saveCourse(course: any) {
    try {
      if (course.id) {
        // Actualizar curso existente
        const courseDocRef = doc(this.db, 'courses', course.id);
        await updateDoc(courseDocRef, {
          title: course.title,
          description: course.description,
          price: course.price,
          imageUrl: course.imageUrl, // Agregar o actualizar la URL de la imagen
          professorId: course.professorId, // Vincular profesor
        });
      } else {
        // Crear nuevo curso
        const newCourseRef = await addDoc(collection(this.db, 'courses'), {
          title: course.title,
          description: course.description,
          price: course.price,
          imageUrl: course.imageUrl, // Agregar la URL de la imagen
          professorId: course.professorId, // Vincular profesor
        });
        // Después de crear el curso, actualizamos el curso con su ID
        course.id = newCourseRef.id;
      }
    } catch (error) {
      console.error("Error al guardar el curso: ", error);
    }
  }

  // Eliminar un curso
  async deleteCourse(courseId: string) {
    try {
      const courseDocRef = doc(this.db, 'courses', courseId);
      await deleteDoc(courseDocRef);
      console.log('Curso eliminado');
      this.loadCourses(); // Recargar la lista de cursos
    } catch (error) {
      console.error('Error al eliminar el curso: ', error);
    }
  }

  // Obtener el total de cursos (proyectos)
  getTotalProjects() {
    return new Observable<number>((observer) => {
      this.getCourses().subscribe((courses) => {
        observer.next(courses.length);
        observer.complete();
      });
    });
  }

  // Obtener los usuarios inscritos a cualquier curso
  getEnrolledUsers() {
    const enrollmentsCollection = collection(this.db, 'enrollments');
    return new Observable<any[]>((observer) => {
      getDocs(enrollmentsCollection).then((querySnapshot) => {
        const enrolledUsers: any[] = [];
        querySnapshot.forEach((doc) => {
          enrolledUsers.push({ ...doc.data(), id: doc.id });
        });
        observer.next(enrolledUsers);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}

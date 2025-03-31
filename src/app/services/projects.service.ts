import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private db = getFirestore();
  private projectsSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadProjects();
  }

  // Cargar los proyectos desde Firestore
  loadProjects() {
    const projectsCollection = collection(this.db, 'projects');
    getDocs(projectsCollection).then((querySnapshot) => {
      const projects: any[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ ...doc.data(), id: doc.id });
      });
      this.projectsSubject.next(projects);
    });
  }

  // Obtener los proyectos como observable
  getProjects() {
    return this.projectsSubject.asObservable();
  }

  // Crear un nuevo proyecto
  createProject(title: string, description: string, price: number, imageUrl: string) {
    const projectsCollection = collection(this.db, 'projects');
    return addDoc(projectsCollection, {
      title,
      description,
      price,
      imageUrl,
    }).then(() => {
      this.loadProjects();
    });
  }

  // Actualizar un proyecto existente
  updateProject(id: string, title: string, description: string, price: number, imageUrl: string) {
    const projectDocRef = doc(this.db, 'projects', id);
    return updateDoc(projectDocRef, {
      title,
      description,
      price,
      imageUrl,
    }).then(() => {
      this.loadProjects();
    });
  }

  // Eliminar un proyecto
  deleteProject(id: string) {
    const projectDocRef = doc(this.db, 'projects', id);
    return deleteDoc(projectDocRef).then(() => {
      this.loadProjects();
    });
  }
}

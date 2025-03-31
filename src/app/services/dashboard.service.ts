import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private db = getFirestore();
  private dashboardDataSubject = new BehaviorSubject<any>({
    coursesCount: 0,
    studentsCount: 0,
    teachersCount: 0,
  });

  constructor() {
    this.loadDashboardData(); // Cargar los datos al inicio
  }

  // Cargar datos del dashboard
  async loadDashboardData() {
    const coursesSnapshot = await getDocs(collection(this.db, 'courses'));
    const studentsSnapshot = await getDocs(collection(this.db, 'users'));
    const teachersSnapshot = await getDocs(collection(this.db, 'teachers'));

    const dashboardData = {
      coursesCount: coursesSnapshot.size,
      studentsCount: studentsSnapshot.size, // Asumiendo que "users" contiene estudiantes
      teachersCount: teachersSnapshot.size,
    };

    this.dashboardDataSubject.next(dashboardData); // Actualizar los datos
  }

  // Obtener datos del dashboard
  getDashboardData() {
    return this.dashboardDataSubject.asObservable();
  }
}

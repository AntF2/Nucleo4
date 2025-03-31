import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service'; // Servicio del Dashboard
import { CoursesService } from '../../services/course.service'; // Servicio de cursos
import { UsersService } from '../../services/user.service'; // Servicio de usuarios
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  dashboardData: any = { 
    coursesCount: 0, 
    studentsCount: 0, 
    teachersCount: 0, 
    projectsCount: 0, // Total de proyectos
    enrolledUsers: [], // Lista de usuarios que han tomado algún curso
    courses: [], // Lista de cursos
    projects: [] // Lista de proyectos
  };

  constructor(
    private dashboardService: DashboardService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    // Obtener los datos del dashboard
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.dashboardData = data;
      this.loadProjectCount();
      this.loadEnrolledUsers();
      this.loadCourses(); // Obtener cursos para mostrar en tarjetas
      this.loadProjects(); // Obtener proyectos para mostrar en tarjetas
    });
  }

  // Obtener el total de proyectos (cursos)
  loadProjectCount() {
    this.projectsService.getProjects().subscribe((totalProjects) => {
      this.dashboardData.totalProjects = totalProjects;
    });
  }

  // Obtener los usuarios que se han inscrito en cualquier curso
  loadEnrolledUsers() {
    this.coursesService.getEnrolledUsers().subscribe((users) => {
      this.dashboardData.enrolledUsers = users;
      this.dashboardData.studentsCount = users.length; // Suponiendo que todos son estudiantes
    });
  }

  // Obtener todos los cursos
  loadCourses() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.dashboardData.courses = courses; // Almacenar los cursos para mostrarlos en tarjetas
      this.dashboardData.coursesCount = courses.length; // Actualizar el contador de cursos
    });
  }

  // Obtener todos los proyectos
  loadProjects() {
    this.projectsService.getProjects().subscribe((projects) => {
      this.dashboardData.projects = projects;
      this.dashboardData.projectsCount = projects.length; // Almacenar los proyectos para mostrarlos en tarjetas
    });
  }
}

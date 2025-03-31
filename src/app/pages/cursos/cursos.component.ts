import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/course.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  courses: any[] = [];
  projects: any[] = [];

  constructor(
    private coursesService: CoursesService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadProjects();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  verMas() {
    alert('Inicia sesión primero.');
  }
}

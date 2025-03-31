import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/course.service'; // Asegúrate de que este servicio existe
import { AuthService } from '../../services/auth.service'; // Servicio para obtener el usuario actual
import { CommonModule } from '@angular/common';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  teachers: any[] = [];
  currentUserId: string = ''; // Variable para almacenar el ID del usuario

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService,

    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit() {
    // Cargar cursos desde el servicio (suponiendo que ya existe el servicio de cursos)
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });

    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
    // Obtener el ID del usuario actual (puedes modificar esto dependiendo de cómo obtienes el ID del usuario)
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserId = user.uid; // Suponiendo que el ID de usuario se almacena como 'uid'
      }
    });
  }

  // Método para inscribirse a un curso
  enrollCourse(course: any) {
    // Llamamos al servicio para inscribir al usuario en el curso
    if (this.currentUserId) {
      this.coursesService.enrollInCourse(course, this.currentUserId);
    } else {
      alert('Por favor, inicie sesión antes de inscribirse en un curso.');
    }
  }

  getProfessorName(professorId: string) {
    const professor = this.teachers.find(teacher => teacher.id === professorId);
    return professor ? professor.name : 'No asignado';
  }
}

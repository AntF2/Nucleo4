import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/course.service';
import { TeachersService } from '../../services/teachers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-courses',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './crud-courses.component.html',
  styleUrls: ['./crud-courses.component.css']
})
export class CrudCoursesComponent implements OnInit {
  courses: any[] = [];
  teachers: any[] = [];
  course: any = { id: null, title: '', description: '', price: '', professorId: '', imageUrl: '' };
  editing: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService // Injectamos el servicio de profesores
  ) {}

  ngOnInit() {
    // Cargar cursos y profesores
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });

    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  // Crear o editar un curso
  saveCourse() {
    this.coursesService.saveCourse(this.course).then(() => {
      alert(this.editing ? 'Curso actualizado' : 'Curso creado');
      this.course = { id: null, title: '', description: '', price: '', professorId: '', imageUrl: '' }; // Limpiar formulario
      this.editing = false;
    });
  }

  // Editar un curso
  editCourse(course: any) {
    this.course = { ...course };
    this.editing = true;
  }

  // Eliminar un curso
  deleteCourse(courseId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.coursesService.deleteCourse(courseId);
    }
  }

  // Obtener el nombre del profesor
  getProfessorName(professorId: string) {
    const professor = this.teachers.find(teacher => teacher.id === professorId);
    return professor ? professor.name : 'No asignado';
  }
}

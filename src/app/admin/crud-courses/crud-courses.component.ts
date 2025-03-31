import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/course.service';
import { TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesFormComponent } from '../../components/courses-form/courses-form.component';

@Component({
  selector: 'app-crud-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, CoursesFormComponent],
  templateUrl: './crud-courses.component.html',
  styleUrls: ['./crud-courses.component.css']
})
export class CrudCoursesComponent implements OnInit {
  courses: any[] = [];
  editing: boolean = false;
  courseToEdit: any = null;
  showForm: boolean = false;
  teachers: any[] = [];

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService
  ) {}

  ngOnInit() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });

    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }
  refreshPage() {
    window.location.reload();
  }
  

  // Mostrar el formulario de agregar/editar curso
  toggleForm(course: any = null) {
    this.showForm = !this.showForm;
    if (course) {
      this.courseToEdit = { ...course };
      this.editing = true;
    } else {
      this.courseToEdit = { id: null, title: '', description: '', price: '', professorId: '', imageUrl: '' };
      this.editing = false;
    }
  }

  // Recargar la lista de cursos luego de agregar/editar
  courseSaved() {
    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    this.toggleForm();
  }

  // Eliminar un curso
  deleteCourse(courseId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.coursesService.deleteCourse(courseId).then(() => {
        this.courses = this.courses.filter(course => course.id !== courseId);
      });
    }
  }

  // Obtener el nombre del profesor
  getProfessorName(professorId: string) {
    const professor = this.teachers.find(teacher => teacher.id === professorId);
    return professor ? professor.name : 'No asignado';
  }
}

import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherFormComponent } from '../../components/teacher-form/teacher-form.component';

@Component({
  selector: 'app-crud-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, TeacherFormComponent],
  templateUrl: './crud-teachers.component.html',
  styleUrls: ['./crud-teachers.component.css']
})
export class CrudTeachersComponent implements OnInit {
  teachers: any[] = [];
  editing: boolean = false;
  teacherToEdit: any = null;
  showForm: boolean = false;

  constructor(private teachersService: TeachersService) {}

  ngOnInit() {
    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  // Mostrar el formulario de agregar/editar profesor
  toggleForm(teacher: any = null) {
    this.showForm = !this.showForm;
    if (teacher) {
      this.teacherToEdit = { ...teacher };
      this.editing = true;
    } else {
      this.teacherToEdit = { id: null, name: '', specialization: '' };
      this.editing = false;
    }
  }
  refreshPage() {
    window.location.reload();
  }
  

  // Recargar la lista de profesores luego de agregar/editar
  teacherSaved() {
    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
    this.toggleForm();
  }

  // Eliminar un profesor
  deleteTeacher(teacherId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
      this.teachersService.deleteTeacher(teacherId).then(() => {
        this.teachers = this.teachers.filter(teacher => teacher.id !== teacherId);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-teachers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crud-teachers.component.html',
  styleUrls: ['./crud-teachers.component.css']
})
export class CrudTeachersComponent implements OnInit {
  teachers: any[] = [];
  teacher: any = { id: null, name: '', specialization: '' };
  editing: boolean = false;

  constructor(private teachersService: TeachersService) {}

  ngOnInit() {
    // Cargar la lista de profesores
    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  // Crear o editar un profesor
  saveTeacher() {
    this.teachersService.saveTeacher(this.teacher).then(() => {
      alert(this.editing ? 'Profesor actualizado' : 'Profesor creado');
      this.teacher = { id: null, name: '', specialization: '' }; // Limpiar formulario
      this.editing = false;
    });
  }

  // Editar un profesor
  editTeacher(teacher: any) {
    this.teacher = { ...teacher };
    this.editing = true;
  }

  // Eliminar un profesor
  deleteTeacher(teacherId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
      this.teachersService.deleteTeacher(teacherId);
    }
  }
}

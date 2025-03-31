import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent {
  @Input() teacher: any = { id: null, name: '', specialization: '' };
  @Input() editing: boolean = false;
  @Output() teacherSaved = new EventEmitter();

  constructor(private teachersService: TeachersService) {}

  saveTeacher() {
    this.teachersService.saveTeacher(this.teacher).then(() => {
      this.teacherSaved.emit();
    });
  }
}

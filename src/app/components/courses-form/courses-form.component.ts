import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/course.service';
import { TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})
export class CoursesFormComponent {
  @Input() course: any = { id: null, title: '', description: '', price: '', professorId: '', imageUrl: '' };
  @Input() editing: boolean = false;
  @Output() courseSaved = new EventEmitter();

  teachers: any[] = [];

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService
  ) {}

  ngOnInit() {
    this.teachersService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  saveCourse() {
    this.coursesService.saveCourse(this.course).then(() => {
      this.courseSaved.emit();
    });
  }
}

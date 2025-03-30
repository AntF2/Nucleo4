import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../services/course.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-crud-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-courses.component.html',
  styleUrls: ['./crud-courses.component.css']
})export class CrudCoursesComponent implements OnInit {
  courses: Course[] = [];
  course: Course = { image: '', title: '', description: '', value: 0 }; // Variable usada en el formulario
  editMode = false;
  courseToEdit: Course | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  addCourse() {
    this.courseService.addCourse(this.course).then(() => {
      this.course = { image: '', title: '', description: '', value: 0 }; // Reiniciar formulario
    });
  }

  editCourse(course: Course) {
    this.editMode = true;
    this.courseToEdit = { ...course };
    this.course = this.courseToEdit; // Usar course en el formulario
  }

  updateCourse() {
    if (this.courseToEdit) {
      this.courseService.updateCourse(this.course).then(() => {
        this.editMode = false;
        this.courseToEdit = null;
        this.course = { image: '', title: '', description: '', value: 0 }; // Reiniciar formulario
      });
    }
  }

  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId);
  }

  cancelEdit() {
    this.editMode = false;
    this.courseToEdit = null;
    this.course = { image: '', title: '', description: '', value: 0 }; // Reiniciar formulario
  }
}

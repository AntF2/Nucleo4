import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  standalone: true,
  imports: [FormsModule, ]
})
export class ProjectFormComponent {
  @Input() selectedProject: any = null;
  @Output() save = new EventEmitter<any>();  // Emitir los datos al componente padre
  @Output() cancel = new EventEmitter<void>();  // Emitir evento de cancelación

  title: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';

  ngOnInit(): void {
    if (this.selectedProject) {
      this.title = this.selectedProject.title;
      this.description = this.selectedProject.description;
      this.price = this.selectedProject.price;
      this.imageUrl = this.selectedProject.imageUrl;
    }
  }

  // Guardar proyecto
  onSave() {
    const projectData = {
      title: this.title,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl,
    };
    this.save.emit(projectData);  // Emitir los datos al componente padre
  }

  // Cancelar
  onCancel() {
    this.cancel.emit();  // Emitir evento de cancelación al componente padre
  }
}

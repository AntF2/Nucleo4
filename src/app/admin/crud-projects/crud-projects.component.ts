import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-projects',
  templateUrl: './crud-projects.component.html',
  styleUrls: ['./crud-projects.component.css'],
  standalone: true,  // Asegúrate de que tu componente sea standalone
  imports: [ProjectFormComponent, CommonModule, FormsModule]  // Agrega el componente a los imports
})
export class CrudProjectsComponent implements OnInit {
  projects: any[] = [];
  showProjectForm: boolean = false;  // Variable para controlar la visibilidad del formulario
  selectedProject: any = null;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  // Mostrar el formulario para agregar un nuevo proyecto
  addNewProject() {
    this.selectedProject = null;  // Limpiar cualquier proyecto seleccionado
    this.showProjectForm = true;  // Mostrar el formulario
  }

  // Función que maneja el guardar un proyecto
  saveProject(projectData: any) {
    if (this.selectedProject) {
      // Si hay un proyecto seleccionado, lo estamos editando
      this.projectsService.updateProject(
        this.selectedProject.id,  // ID del proyecto a editar
        projectData.title,        // Título del proyecto
        projectData.description,  // Descripción del proyecto
        projectData.price,        // Precio del proyecto
        projectData.imageUrl      // URL de la imagen
      ).then(() => {
        alert("Proyecto actualizado");
        this.showProjectForm = false;
      });
    } else {
      // Si no hay proyecto seleccionado, estamos creando uno nuevo
      this.projectsService.createProject(
        projectData.title,        // Título del proyecto
        projectData.description,  // Descripción del proyecto
        projectData.price,        // Precio del proyecto
        projectData.imageUrl      // URL de la imagen
      ).then(() => {
        alert("Proyecto creado");
        this.showProjectForm = false;
      });
    }
  }
  

  // Editar un proyecto
  editProject(project: any) {
    this.selectedProject = project;  // Guardar el proyecto seleccionado
    this.showProjectForm = true;  // Mostrar el formulario
  }

  // Eliminar un proyecto
  deleteProject(id: string) {
    this.projectsService
      .deleteProject(id)
      .then(() => {
        alert('Proyecto eliminado');
      })
      .catch((error) => {
        console.error('Error al eliminar el proyecto:', error);
      });
  }

  // Cancelar la edición y ocultar el formulario
  cancelForm() {
    this.showProjectForm = false;
  }
}
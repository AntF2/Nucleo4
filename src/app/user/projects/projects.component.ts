import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';  // Asegúrate de que este servicio exista
import { CartService } from '../../services/cart.service';        // Servicio para el carrito
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(
    private projectsService: ProjectsService,
    private cartService: CartService  // Inyectamos el servicio para manejar el carrito
  ) {}

  ngOnInit() {
    // Cargar proyectos desde el servicio
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  // Método para añadir un proyecto al carrito
  addToCart(project: any) {
    this.cartService.addToCart(project);
  }
}

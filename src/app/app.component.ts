import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { firebaseConfig } from './app.config'; // Ruta al archivo de configuración
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-materias';
  
}

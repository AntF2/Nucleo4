import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { firebaseConfig } from './app.config'; // Ruta al archivo de configuración
import { initializeApp } from "firebase/app";
import { FooterComponent } from './components/footer/footer.component';

initializeApp(firebaseConfig);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-materias';
  
}

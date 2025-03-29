import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  ngAfterViewInit() {
    let menu = document.querySelector('#menu-icon') as HTMLElement;
    let navbar = document.querySelector('.navbar') as HTMLElement;

    if (menu && navbar) {
      menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
      };
    }
  }
}

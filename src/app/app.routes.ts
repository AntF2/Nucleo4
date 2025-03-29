import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { NavComponent } from './components/nav/nav.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login-register', component: LoginRegisterComponent },
    {path: 'nav', component: NavComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'contact', component: ContactComponent}
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { NavComponent } from './components/nav/nav.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeUserComponent } from './user/home-user/home-user.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { UserGuard } from './auth/user.guard';
import { AdminGuard } from './auth/admin.guard';
import { CrudCoursesComponent } from './admin/crud-courses/crud-courses.component';
import { CrudTeachersComponent } from './admin/crud-teachers/crud-teachers.component';
import { CrudUsersComponent } from './admin/crud-users/crud-users.component';
import { CoursesComponent } from './user/courses/courses.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { CrudProjectsComponent } from './admin/crud-projects/crud-projects.component';
import { CartComponent } from './components/cart/cart.component';
import { ProjectsComponent } from './user/projects/projects.component';
import { CursosComponent } from './pages/cursos/cursos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'loginregister', component: LoginRegisterComponent }, 
    { path: 'nav', component: NavComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'contact', component: ContactComponent },


    // User
    { path: 'homeUser', component: HomeUserComponent, canActivate: [UserGuard] },
    { path: 'course', component: CoursesComponent, canActivate: [UserGuard] },
    { path: 'projects', component: ProjectsComponent, canActivate: [UserGuard] },
    { path: 'profile', component: EditUserComponent, canActivate: [UserGuard] },
    { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
    

    // Admin
    { path: 'homeAdmin', component: HomeAdminComponent, canActivate: [AdminGuard] },
    { path: 'courses', component: CrudCoursesComponent, canActivate: [AdminGuard] },
    { path: 'teachers', component: CrudTeachersComponent, canActivate: [AdminGuard] },
    { path: 'users', component: CrudUsersComponent, canActivate: [AdminGuard] },
    { path: 'project', component: CrudProjectsComponent, canActivate: [AdminGuard] },
];


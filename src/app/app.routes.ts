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
import { MessagesComponent } from './admin/messages/messages.component';
import { MessageComponent } from './user/message/message.component';
import { CoursesComponent } from './user/courses/courses.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { PostWorksComponent } from './user/post-works/post-works.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login-register', pathMatch: 'full' }, // Redirige la ruta raíz a login-register
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'loginregister', component: LoginRegisterComponent }, 
    { path: 'nav', component: NavComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'contact', component: ContactComponent },

    //User
    { path: 'homeUser', component: HomeUserComponent, canActivate: [UserGuard] },
    { path: 'messages', component: MessageComponent, canActivate: [UserGuard] },
    { path: 'course', component: CoursesComponent, canActivate: [UserGuard] },
    { path: 'profile', component: EditUserComponent, canActivate: [UserGuard] },
    { path: 'postWorks', component: PostWorksComponent, canActivate: [UserGuard] },

    //Admin
    { path: 'homeAdmin', component: HomeAdminComponent, canActivate: [AdminGuard] },
    { path: 'courses', component: CrudCoursesComponent, canActivate: [AdminGuard] },
    { path: 'teachers', component: CrudTeachersComponent, canActivate: [AdminGuard] },
    { path: 'users', component: CrudUsersComponent, canActivate: [AdminGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AdminGuard] },
    
    
];

import { Routes } from '@angular/router';
import { LibroComponent } from './userViews/libro/libro.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PrestamoComponent } from './userViews/prestamo/prestamo.component';
import { LoginComponent } from './login/login.component';
import { AdminLibroComponent } from './adminViews/admin-libro/admin-libro.component';
import { UsuariosComponent } from './adminViews/usuarios/usuarios.component';
import { CategoriasAggComponent } from './adminViews/categorias-agg/categorias-agg.component';
import { DetprestamoComponent } from './userViews/detprestamo/detprestamo.component';
import { RegistrarComponent } from './userViews/registrar/registrar.component';

export const routes: Routes = [
    {path:'', component: IndexComponent},
    {path:'userLibro', component: LibroComponent},
    {path:'userPrestamo', component: PrestamoComponent},
    {path:'login', component: LoginComponent},
    {path:'adminLibro', component: AdminLibroComponent},
    {path:'usuarios', component: UsuariosComponent},
    {path:'adminUsuarios', component: UsuariosComponent},
    {path:'categorias', component: CategoriasAggComponent},
    {path:'detprestamo', component: DetprestamoComponent},
    {path:'registrar', component: RegistrarComponent},
    
];

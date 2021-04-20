import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { HomeComponent } from './home/home.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservarMesaComponent } from './reservar-mesa/reservar-mesa.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';

const routes: Routes = [
    {
        path: '', component: InicioComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'formLogin', component: FormLoginComponent
    },
    {
        path: 'formRegistro', component: FormRegistroComponent
    },
    {
        path: 'paginaPrincipal', component: PaginaPrincipalComponent
    },
    {
        path: 'infoUsuario', component: InformacionUsuarioComponent
    },
    {
        path: 'restaurantes', component: RestaurantesComponent
    },
    {
        path: 'reservarMesa', component: ReservarMesaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

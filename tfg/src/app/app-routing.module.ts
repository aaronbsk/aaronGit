// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { HistorialReservasComponent } from './historial-reservas/historial-reservas.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservarMesaComponent } from './reservar-mesa/reservar-mesa.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';

// Constante con todas las rutas de mi aplicacion
const routes: Routes = [
    {
        path: '', component: InicioComponent
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
    },
    {
        path: 'historialReservas', component: HistorialReservasComponent
    }
];

// Export del objeto RouterModule para poder utilizarlo en los componentes y editar rutas desde dentro
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

// Export de la clase
export class AppRoutingModule { }

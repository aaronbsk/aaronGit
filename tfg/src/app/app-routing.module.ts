// Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { HistorialReservasComponent } from './historial-reservas/historial-reservas.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { ReservarMesaComponent } from './reservar-mesa/reservar-mesa.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';

// Constante con todas las rutas de mi aplicacion
const routes: Routes = [
    {
        path: '', component: PaginaPrincipalComponent
    },
    {
        path: 'login', component: FormLoginComponent
    },
    {
        path: 'registro', component: FormRegistroComponent
    },
    {
        path: 'perfil', component: InformacionUsuarioComponent
    },
    {
        path: 'restaurantes', component: RestaurantesComponent
    },
    {
        path: 'reserva', component: ReservarMesaComponent
    },
    {
        path: 'historial', component: HistorialReservasComponent
    },
    {
        path: 'recuperarContrasena', component: RecuperarContrasenaComponent
    }
];

// Export del objeto RouterModule para poder utilizarlo en los componentes y editar rutas desde dentro
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

// Export de la clase
export class AppRoutingModule { }

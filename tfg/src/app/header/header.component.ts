// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase HeaderComponent
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

// Export de la clase Header Component
export class HeaderComponent implements OnInit {

    // Constructor de la clase HeaderComponent
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ){ }

    // Método inicializador de la clase HeaderComponent
    ngOnInit(): void {
    }

    // Método para realizar el Logout del usuario
    logout(){
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                // Realizo el logout del usuario logueado
                this.afAuth.signOut();
                localStorage.removeItem('usuario');
                localStorage.removeItem('nombreUsuarioActivo');
                this.router.navigateByUrl('');
            // En caso de no haber usuario logueado
            }else {
                this.msj.mensajeLogoutSinUsuario();
            }
        });
    }

    // Método para redirigir al usuario al perfil del usuario si el usuario está logueado
    accederPerfil(){
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
            // Redirijo al usuario
            if (user != null){
                this.router.navigateByUrl('/infoUsuario');
            // En caso de no haber usuario logueado
            }else{
                this.msj.mensajeAccederPerfilError();
            }
        })
    }

    // Método para redirigir al usuario al Historial de Reservas si el usuario está logueado
    accederHistorial(){
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
            // Redirijo al usuario
            if (user != null){
                this.router.navigateByUrl('/historialReservas');
            // En caso de no haber usuario logueado
            }else{
                this.msj.mensajeAccederHistorialError();
            }
        })
    }
}

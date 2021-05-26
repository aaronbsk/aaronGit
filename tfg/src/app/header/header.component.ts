// Imports
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase HeaderComponent
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

// Export de la clase Header Component
export class HeaderComponent implements OnInit {
    // Declaración de variables
    esVisible: boolean = true;
    usuarios: Usuario[] = new Array<Usuario>();
    nombre: string = "Usuario";
    botonText: string = "Logout";
    url: string = "";

    // Constructor de la clase HeaderComponent
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService,
        private db: AngularFirestore,
        private _location: Location
    ){ }

    // Método inicializador de la clase HeaderComponent
    ngOnInit(): void {
        this.url = this._location.path();
        // Comprobación si existe usuario logueado
        this.afAuth.onAuthStateChanged((user)=> {
            if (user != null){
                // Muestro el boton Logout solo en el caso que exista usuario loguead
                this.esVisible = false;
                this.botonText = "Logout";

                // Recibo información usuario que coincide con el email del usuario registrado
                this.db.collection('usuarios', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        let usuario: any = item.data()

                        this.usuarios.push(usuario);

                        this.usuarios.forEach((values)=> {
                            this.nombre = values.nombre;
                        })
                    })
                })
            // En caso de no haber usuario logueado
            }else if (this.url === ""){
                this.esVisible = true;
            }else {
                this.esVisible = true;
                this.nombre = "Usuario";
            }
        });
    }

    // Método para realizar el Logout del usuario
    logout(){
        // Realizo el logout del usuario logueado
        this.afAuth.signOut();
        localStorage.removeItem('usuario');
        localStorage.removeItem('nombreUsuarioActivo');
        this.router.navigateByUrl('');
        this.esVisible = true;
    }

    // Método para acceder al Login
    accederLogin(){
        this.router.navigateByUrl('/formLogin');
        this.esVisible = false;
        this.botonText = "Atras";
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

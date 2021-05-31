// Imports
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase InformacionUsuarioComponent
@Component({
    selector: 'app-informacion-usuario',
    templateUrl: './informacion-usuario.component.html',
    styleUrls: ['./informacion-usuario.component.css']
})

// Export de la clase InformacionUsuarioComponent
export class InformacionUsuarioComponent implements OnInit {
    // Declaración de variables
    usuarios: Usuario[] = new Array<Usuario>();
    inputType: string = 'password';
    email: string;

    // Constructor de la clase InformacionUsuarioComponent
    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private msj: MensajesService,
        private _location: Location
    ) { }

    // Método inicializador de la clase InformacionUsuarioComponent
    ngOnInit(): void {
        // Comprobación si existe usuario logueado
        this.afAuth.onAuthStateChanged((user)=> {
            if (user != null){
                // Recibo información usuario que coincide con el email del usuario logueado
                this.db.collection('usuarios', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        let usuario: any = item.data()

                        this.usuarios.push(usuario);
                    });
                });
            // En caso de no haber usuario logueado
            }else {
                this.msj.mensajeAccederPerfilError();
                this.router.navigateByUrl('');
            }
        });
    }

    // Método para volver a la localización previa
    volverAtras(){
        this._location.back();
    }

    // Método para redirigir al usuario al Historial de Reservas
    irAHistorial(){
        this.router.navigateByUrl('/historial');
    }

    // Método para cambiar la visibilidad de la contraseña. Por defecto en oculto
    cambiarVisibilidad(){
        // Compruebo el tipo del input y lo invierto al presionar el botón
        if(this.inputType === 'password'){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }
    }

    // Método para realizar el cambio de contraseña mediante un correo enviado a la cuenta de correo del usuario
    cambiarContrasena(){
        // Extraigo el email del usuario logueado
        this.usuarios.forEach((usuario)=> {
            this.email = usuario.email;
        })
        // Utilizo el método predefinido de Firebase para restablecer contraseña con el email del usuario logueado
        this.afAuth.sendPasswordResetEmail(this.email).then(()=> {
            this.msj.mensajeCorreoRestablecerPassCorrecto();
        // En caso de haber un error con el método de firebase
        }).catch((error)=> {
            this.msj.mensajeCorreoRestablecerPassError(error.message);
        });
    }
}

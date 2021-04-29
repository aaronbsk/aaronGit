import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-informacion-usuario',
    templateUrl: './informacion-usuario.component.html',
    styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {
    usuarios: Usuario[] = new Array<Usuario>();
    inputType: string = 'password';
    email: string;

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ) { }

    ngOnInit(): void {
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.db.collection('usuarios', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        let usuario: any = item.data()

                        this.usuarios.push(usuario);
                    });
                });
            }else {
                this.msj.mensajeAccederPerfilError();
                this.router.navigateByUrl('');
            }
        });
    }

    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

    irAHistorial(){
        this.router.navigateByUrl('/historialReservas');
    }

    cambiarVisibilidad(){
        if(this.inputType === 'password'){
            this.inputType = 'text';
        }else{
            this.inputType = 'password';
        }
    }

    cambiarContrasena(){
        this.usuarios.forEach((usuario)=> {
            this.email = usuario.email;
        })
        this.afAuth.sendPasswordResetEmail(this.email).then(()=> {
            this.msj.mensajeCorreoRestablecerPassCorrecto();
        }).catch((error)=> {
            this.msj.mensajeCorreoRestablecerPassError(error.message);
        });
    }
}

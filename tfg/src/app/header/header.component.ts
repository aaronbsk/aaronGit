import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ){ }

    ngOnInit(): void {
    }

    logout(){
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.afAuth.signOut();
                localStorage.removeItem('usuario');
                localStorage.removeItem('nombreUsuarioActivo');
                this.router.navigateByUrl('');
            }else {
                this.msj.mensajeLogoutSinUsuario();
            }
        });
    }

    accederPerfil(){
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.router.navigateByUrl('/infoUsuario');
            }else{
                this.msj.mensajeAccederPerfilError();
            }
        })
    }

    accederHistorial(){
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.router.navigateByUrl('/historialReservas');
            }else{
                this.msj.mensajeAccederHistorialError();
            }
        })
    }
}

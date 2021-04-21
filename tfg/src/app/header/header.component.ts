import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { Popper } from 

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    // showHeader: boolean = false;
    // showHeaderTitulo: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ){
        // router.events.forEach((event)=> {
        //     if (event instanceof NavigationStart){
        //         if (event['url'] === '/' || event['url'] === '/home' || event['url'] === '/formLogin' || event['url'] === '/formRegistro'){
        //             this.showHeader = false;
        //         }else {
        //             this.showHeader = true;
        //         }
        //     }
        // });

        // router.events.forEach((event)=> {
        //     if (event instanceof NavigationStart){
        //         if (event['url'] === '/'){
        //             this.showHeaderTitulo = false;
        //         }else {
        //             this.showHeaderTitulo = true;
        //         }
        //     }
        // });
    }

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
}

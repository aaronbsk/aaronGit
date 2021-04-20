import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Component({
    selector: 'app-pagina-principal',
    templateUrl: './pagina-principal.component.html',
    styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
    nombreUsuario: string = "";

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('usuario')
        this.afAuth.currentUser.then((idToken)=> {
            idToken;
            localStorage.setItem('usuario', idToken.uid);
            if (localStorage.getItem('usuario')){
                this.db.collection('usuarios').valueChanges().subscribe((data: Array<Usuario>)=> {
                    this.nombreUsuario = data[0].nombre;
                });
            }else {
                this.router.navigateByUrl('/home');
            }
        });
    }

    irAReservarMesa(){
        this.router.navigateByUrl('/reservarMesa');
    }



}

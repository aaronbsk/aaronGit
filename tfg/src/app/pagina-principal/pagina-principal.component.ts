import { ThrowStmt } from '@angular/compiler';
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
    nombre: string;
    usuarios: Usuario[] = new Array<Usuario>();

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('usuario')
        this.afAuth.currentUser.then((user)=> {
            localStorage.setItem('usuario', user.uid);
            if (localStorage.getItem('usuario')){
                this.db.collection('usuarios', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        console.log(item.data());
                        let usuario: any = item.data()

                        this.usuarios.push(usuario);

                        this.usuarios.forEach((values)=> {
                            this.nombre = values.nombre;
                        })
                    })
                })
            }else {
                this.router.navigateByUrl('/home');
            }
        });
    }

    irAReservarMesa(){
        this.router.navigateByUrl('/reservarMesa');
    }



}

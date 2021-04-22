import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-pagina-principal',
    templateUrl: './pagina-principal.component.html',
    styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
    nombre: string;
    usuarios: Usuario[] = new Array<Usuario>();
    esVisible: boolean = false;

    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('usuario')
        this.afAuth.currentUser.then((user)=> {
            if(user != null){
                this.esVisible = true;
                localStorage.setItem('usuario', user.uid);
                if (localStorage.getItem('usuario')){
                    this.db.collection('usuarios', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                        data.docs.forEach((item)=> {
                            let usuario: any = item.data()
    
                            this.usuarios.push(usuario);
    
                            this.usuarios.forEach((values)=> {
                                this.nombre = values.nombre;
                            })
                        })
                    })
                }
            }else{
                this.esVisible = false;
            }
        });
    }

    irAReservarMesa(){
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.router.navigateByUrl('/reservarMesa');
            }else {
                this.msj.mensajeReservarMesaLogoutError();
            }
        });
    }



}

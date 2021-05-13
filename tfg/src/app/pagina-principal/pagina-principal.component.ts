// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase PaginaPrincipalComponent
@Component({
    selector: 'app-pagina-principal',
    templateUrl: './pagina-principal.component.html',
    styleUrls: ['./pagina-principal.component.css']
})

// Export de la clase PaginaPrincipalComponent
export class PaginaPrincipalComponent implements OnInit {
    // Declaración de variables
    nombre: string;
    usuarios: Usuario[] = new Array<Usuario>();
    esVisible: boolean = false;

    // Constructor de la clase PaginaPrincipalComponent
    constructor(
        private router: Router,
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
        private msj: MensajesService
    ) { }

    // Método inicializador de la clase PaginaPrincipalComponent
    ngOnInit(): void {
        localStorage.removeItem('usuario');
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
            if(user != null){
                this.esVisible = true;
                localStorage.setItem('usuario', user.uid);
                if (localStorage.getItem('usuario')){
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
                }
            // En caso de no haber usuario logueado
            }else{
                this.esVisible = false;
            }
        });
    }

    // Método para redirigir a Reservar mesa
    irAReservarMesa(){
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.router.navigateByUrl('/reservarMesa');
            // En caso de no haber usuario logueado
            }else {
                this.msj.mensajeReservarMesaLogoutError();
            }
        });
    }



}

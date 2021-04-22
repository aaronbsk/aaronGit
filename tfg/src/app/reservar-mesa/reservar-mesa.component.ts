import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reserva } from '../models/reserva';
import { Restaurante } from '../models/restaurante';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-reservar-mesa',
    templateUrl: './reservar-mesa.component.html',
    styleUrls: ['./reservar-mesa.component.css']
})
export class ReservarMesaComponent implements OnInit {
    formularioReservar: FormGroup;
    restaurantes: Restaurante[] = new Array<Restaurante>();
    mensaje: string = '';
    nombreRestaurante: string = '';

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService,
        private fb: FormBuilder,
        private db: AngularFirestore,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        // this.afAuth.currentUser.then((user)=> {
        //    if (user != null){
                this.restaurantes.length = 0;
                this.db.collection('restaurantes').get().subscribe((resultado)=> {
                    resultado.docs.forEach((item)=> {
                        let restaurante: any = item.data();
                        
                        this.restaurantes.push(restaurante);
                    })
                });

                this.formularioReservar = this.fb.group({
                    nombre: ['', Validators.required],
                    email: ['', Validators.compose([
                        Validators.required,
                        Validators.email
                    ])],
                    fecha: ['', Validators.required],
                    nombreRestaurante: ['', Validators.required]
                });
        //     }else {
        //         this.msj.mensajeAccederReservasError();
        //         this.router.navigateByUrl('/paginaPrincipal');
        //     }
        // });
    }

    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

    reservar(){
        if (this.formularioReservar.valid){
            this.spinner.show();

            let reservaAgregar: Reserva = {
                nombre: this.formularioReservar.value.nombre,
                email: this.formularioReservar.value.email,
                fecha: new Date(this.formularioReservar.value.fecha),
                nombreRestaurante: this.formularioReservar.value.nombreRestaurante
            };

            this.restaurantes.length = 0;

            this.db.collection('reservas').add(reservaAgregar).then(()=> {
                this.mensaje = 'Ha reservado mesa en el restaurante ' + reservaAgregar.nombreRestaurante + 'correctamente';
                this.msj.mensajeReservaCorrecta(this.mensaje);
                this.spinner.hide();
                this.router.navigateByUrl('/paginaPrincipal');
                this.db.collection('restaurantes', ref => ref.where('nombre', '==', reservaAgregar.nombreRestaurante)).get().subscribe((resultado)=> {
                    resultado.docs.forEach((item)=> {
                        let restaurante: any = item.data();

                        this.restaurantes.push(restaurante);
                    })
                });
                this.restaurantes.forEach((restaurante)=> {
                    this.nombreRestaurante = restaurante.nombre;
                });
                // this.afAuth.isSignInWithEmailLink(this.nombreRestaurante).then(()=> {

                // })
            }).catch((error)=> {
                this.formularioReservar.reset();
                this.mensaje = error.message;
                this.msj.mensajeReservaError(this.mensaje);
                this.spinner.hide();
            });
        }else {
            this.msj.mensajeFormReservaError();
        }
    }

}

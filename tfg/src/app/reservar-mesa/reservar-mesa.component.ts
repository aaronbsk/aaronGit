// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { emailReserva } from '../models/emailReserva';
import { Reserva } from '../models/reserva';
import { Restaurante } from '../models/restaurante';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase ReservarMesaComponent
@Component({
    selector: 'app-reservar-mesa',
    templateUrl: './reservar-mesa.component.html',
    styleUrls: ['./reservar-mesa.component.css']
})

// Export de la clase ReservarMesaComponent
export class ReservarMesaComponent implements OnInit {
    // Declaración de variables
    formularioReservar: FormGroup;
    restaurantes: Restaurante[] = new Array<Restaurante>();
    mensaje: string = '';
    nombreRestaurante: string = '';
    emailRestaurante: string = '';
    emailReserva: emailReserva = new emailReserva();

    // Constructor de la clase ReservarMesaComponent
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private msj: MensajesService,
        private fb: FormBuilder,
        private db: AngularFirestore,
        private spinner: NgxSpinnerService
    ) { }

    // Método inicializador de la clase ReservarMesaComponent
    ngOnInit(): void {
        // Comprobación si existe usuario logueado
        this.afAuth.currentUser.then((user)=> {
           if (user != null){
                this.restaurantes.length = 0;
                // Recibo los restaurantes de la Base de Datos
                this.db.collection('restaurantes').get().subscribe((resultado)=> {
                    resultado.docs.forEach((item)=> {
                        let restaurante: any = item.data();
                        
                        this.restaurantes.push(restaurante);
                    })
                });

                // Validacion del formulario de reservar mesa
                this.formularioReservar = this.fb.group({
                    nombre: ['', Validators.required],
                    email: ['', Validators.compose([
                        Validators.required,
                        Validators.email
                    ])],
                    tlf: ['', Validators.compose([
                        Validators.maxLength(9),
                        Validators.minLength(9),
                        Validators.required
                    ])],
                    numPersonas: ['', Validators.required],
                    fecha: ['', Validators.required],
                    nombreRestaurante: ['', Validators.required]
                });
            // En caso de no haber usuario logueado
            }else {
                this.msj.mensajeReservarMesaLogoutError();
                this.router.navigateByUrl('/paginaPrincipal');
            }
        });
    }

    // Método para volver a la localización previa
    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

    // Método para realizar la reserva del usuario
    reservar(){
        if (this.formularioReservar.valid){
            this.spinner.show();
            this.restaurantes.length = 0;

            let reservaAgregar: Reserva = {
                nombre: this.formularioReservar.value.nombre,
                email: this.formularioReservar.value.email,
                fecha: this.formularioReservar.value.fecha,
                numPersonas: this.formularioReservar.value.numPersonas,
                nombreRestaurante: this.formularioReservar.value.nombreRestaurante,
                tlf: this.formularioReservar.value.tlf
            };

            // Agregar la reserva en la BD
            this.db.collection('reservas').add(reservaAgregar).then(()=> {
                // Conseguir la información del restaurante reservado
                this.db.collection('restaurantes', ref => ref.where('nombre', '==', reservaAgregar.nombreRestaurante)).get().subscribe((resultado)=> {
                    resultado.docs.forEach((item)=> {
                        let restaurante: any = item.data();

                        this.restaurantes.push(restaurante);
                    });

                    this.restaurantes.forEach((restaurante)=> {
                        this.nombreRestaurante = restaurante.nombre;
                        this.emailRestaurante = restaurante.email;
                    });

                    // Guardar el mail que se enviará al restaurante con la información de la reserva en la BD
                    this.emailReserva = {
                        nombreCliente: reservaAgregar.nombre,
                        correoRestaurante: this.emailRestaurante,
                        mensaje: `El cliente ${reservaAgregar.nombre} ha reservado en su establecimiento para ${reservaAgregar.numPersonas} personas a las ${new Date(reservaAgregar.fecha).getHours()}:${new Date(reservaAgregar.fecha).getMinutes()} horas.
                        Si necesita ponerse en contacto con el cliente para alguna indicación, su teléfono es ${reservaAgregar.tlf} y su correo ${reservaAgregar.email}`
                    };

                    this.db.collection('emailReservas').add(this.emailReserva).then(()=> {
                        this.mensaje = 'Se ha enviado un correo al restaurante para informar de su reserva y de la indicaciones de esta. En caso de indicaciones por parte del restaurante, se pondran en contacto con usted vía correo o teléfono';
                        this.msj.mensajeReservaCorrecto(this.mensaje);
                        this.spinner.hide();
                        this.router.navigateByUrl('/paginaPrincipal');

                    // En caso de fallo al hacer el insert en la BD del mail de la reserva
                    }).catch((error)=> {
                        this.formularioReservar.reset();
                        this.mensaje = error.message;
                        this.msj.mensajeEmailReservaError(this.mensaje);
                    });
                });

            // En caso de fallo al realizar la reserva
            }).catch((error)=> {
                this.formularioReservar.reset();
                this.mensaje = error.message;
                this.msj.mensajeReservaError(this.mensaje);
                this.spinner.hide();
            });

        // En caso de que el formulario Reserva no sea válido
        }else {
            this.msj.mensajeFormReservaError();
        }
    }
    
}

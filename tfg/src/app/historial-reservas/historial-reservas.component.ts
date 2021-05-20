// Imports
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Reserva } from '../models/reserva';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase HistorialReservasComponent
@Component({
    selector: 'app-historial-reservas',
    templateUrl: './historial-reservas.component.html',
    styleUrls: ['./historial-reservas.component.css']
})

// Export de la clase HistorialReservasComponent
export class HistorialReservasComponent implements OnInit {
    // Declaración de variables
    reservas: Reserva[] = new Array<Reserva>();

    // Constructor de la clase HistorialReservasComponent
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private msj: MensajesService,
        private _location: Location,
        private db: AngularFirestore
    ) { }

    // Método inicializador de la clase HistorialReservasComponent
    ngOnInit(): void {
        // Comprobación si existe usuario logueado
        this.afAuth.onAuthStateChanged((user)=> {
            if (user != null){
                // Recibo información reservas que coincida con el email del usuario logueado
                this.db.collection('reservas', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        let reserva: any = item.data()

                        this.reservas.push(reserva);
                    });
                });
            // En caso de no haber usuario logueado
            }else {
                this.msj.mensajeAccederHistorialError();
                this.router.navigateByUrl('');
            }
        })
    }

    // Método para volver a la localización previa
    volverAtras(){
        this._location.back();
    }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Reserva } from '../models/reserva';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-historial-reservas',
    templateUrl: './historial-reservas.component.html',
    styleUrls: ['./historial-reservas.component.css']
})
export class HistorialReservasComponent implements OnInit {
    reservas: Reserva[] = new Array<Reserva>();

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private msj: MensajesService,
        private _location: Location,
        private db: AngularFirestore
    ) { }

    ngOnInit(): void {
        this.afAuth.currentUser.then((user)=> {
            if (user != null){
                this.db.collection('reservas', ref => ref.where('email', '==', user.email)).get().subscribe((data)=> {
                    data.docs.forEach((item)=> {
                        let reserva: any = item.data()

                        this.reservas.push(reserva);

                        // this.reservas.forEach((item)=> {
                        //     item.fecha = new Date(item.fecha);
                        // })
                    });
                });
            }else {
                this.msj.mensajeAccederHistorialError();
                this.router.navigateByUrl('/paginaPrincipal');
            }
        })
    }

    volverAtras(){
        this._location.back();
    }

}

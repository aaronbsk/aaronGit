import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class MensajesService {

    constructor() { }

    mensajeLoginError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    mensajeRegistroError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    mensajeRegistroCorrecto(mensaje: string){
        Swal.fire({
            title: 'Enhorabuena!',
            text: mensaje,
            icon: 'success'
        })
    }
}

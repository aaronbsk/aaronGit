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

    mensajeCorreoRestablecerPassCorrecto(){
        Swal.fire({
            title: 'Restablece tu contraseña',
            text: 'Le hemos enviado un correo a su cuenta para que restablezca la contraseña',
            icon: 'info'
        })
    }

    mensajeCorreoRestablecerPassError(mensaje: string){
        Swal.fire({
            title: 'Error',
            text: 'ERROR: ' + mensaje + '. Ha ocurrido un error intentando reestablecer su contraseña, porfavor, vuelva a intentarlo.',
            icon: 'error'
        })
    }

    mensajeLogoutSinUsuario(){
        Swal.fire({
            title: 'Error',
            text: 'No puedes cerrar sesión sin haberla iniciado antes',
            icon: 'error'
        })
    }
}

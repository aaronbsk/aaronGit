// Imports
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Inyección del tipo Injectable para la clase MensajesService
@Injectable({
    providedIn: 'root'
})

// Export de la clase MensajesService
export class MensajesService {

    // Constructor de la clase MensajesService
    constructor() { }

    // Método para mostrar mensaje error al hacer Login
    mensajeLoginError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    mensajeRecuperacionPassError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al hacer Registro
    mensajeRegistroError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    // Método para mostrar mensaje correcto al hacer Registro
    mensajeRegistroCorrecto(mensaje: string){
        Swal.fire({
            title: 'Enhorabuena!',
            text: mensaje,
            icon: 'success'
        })
    }

    // Método para mostrar mensaje correcto al restablecer la contraseña
    mensajeCorreoRestablecerPassCorrecto(){
        Swal.fire({
            title: 'Restablece tu contraseña',
            text: 'Le hemos enviado un correo a su cuenta para que restablezca la contraseña',
            icon: 'info'
        })
    }

    // Método para mostrar mensaje error al restablecer la contraseña
    mensajeCorreoRestablecerPassError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: 'ERROR: ' + mensaje + '. Ha ocurrido un error intentando reestablecer su contraseña, porfavor, vuelva a intentarlo.',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al hacer Logout
    mensajeLogoutSinUsuario(){
        Swal.fire({
            title: 'Error!',
            text: 'No puedes cerrar sesión sin haberla iniciado antes',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al acceder a ReservaraMesa
    mensajeReservarMesaLogoutError(){
        Swal.fire({
            title: 'Error!',
            text: 'No puedes reservar mesa sin haber iniciado sesión previamente',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al acceder a HistorialReservas
    mensajeAccederHistorialError(){
        Swal.fire({
            title: 'Error!',
            text: 'No puedes acceder a tu historial de reservas sin haber iniciado sesión previamente',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al acceder a Perfil
    mensajeAccederPerfilError(){
        Swal.fire({
            title: 'Error!',
            text: 'No puedes acceder a tu perfil sin haber iniciado sesión previamente',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al conectar con la base de datos a la hora de realizar la reserva
    mensajeReservaError(mensaje: string){
        Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error'
        })
    }

    // Método para mostrar mensaje error al hacer la reserva con el formulario no válido
    mensajeFormReservaError(){
        Swal.fire({
            title: 'Error!',
            text: 'Porfavor, revisa que los datos esten correctos',
            icon: 'error'
        })
    }

    // Método para mostrar mensaje correcto al realizar la reserva
    mensajeReservaCorrecto(mensaje: string){
        Swal.fire({
            title: 'Reserva realizada',
            text: mensaje,
            icon: 'success'
        })
    }

    // Método para mostrar mensaje error al conectar con la base de datos a la hora de guardar el mail con la información de la reserva
    mensajeEmailReservaError(mensaje: string){
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error'
        })
    }
}

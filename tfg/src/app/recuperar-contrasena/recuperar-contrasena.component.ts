import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-recuperar-contrasena',
    templateUrl: './recuperar-contrasena.component.html',
    styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
    formRecuperarPass: FormGroup;
    datosCorrectos: boolean = true;
    textoMensajes: string = "";

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private spinner: NgxSpinnerService,
        private msj: MensajesService,
        public afAuth: AngularFireAuth
    ) { }

    // Método inicializador de la clase RecuperarContrasenaComponent
    ngOnInit(): void {
        // Comprobación si existe usuario logueado
        this.afAuth.onAuthStateChanged((user)=> {
            if (user != null){
                // Si existe usuario logueado redirijo al Home
                this.router.navigateByUrl('');
            // En caso de no haber usuario logueado
            }else {
                // Si no existe usuario logueado validación del formulario de recuperación de contraseña
                this.formRecuperarPass = this.fb.group({
                    pass: ['', Validators.required]
                });
            }
        })
    }

    recuperar() {
        // Comprobación si formulario es válido
        if(this.formRecuperarPass.valid){
            this.datosCorrectos = true;
            this.spinner.show();
            // Actualizo contraseña del usuario y redirijo al Login
            this.afAuth.signInWithEmailAndPassword(this.formRecuperarPass.value.email, this.formRecuperarPass.value.pass)
            .then(()=> {
                this.router.navigateByUrl('/login');
                this.spinner.hide();
                this.formRecuperarPass.reset();
                this.msj.mensajeCorreoRestablecerPassCorrecto();
            // En caso de haber un error al actualizar la contraseña del usuario en Firebase
            }).catch((error)=> {
                this.datosCorrectos = false;
                this.textoMensajes = error.message;
                this.spinner.hide();
                this.msj.mensajeCorreoRestablecerPassError(this.textoMensajes);
                this.formRecuperarPass.reset();
            });
        // En caso de formulario no válido
        }else{
            this.datosCorrectos = false;
            this.textoMensajes = 'Porfavor, revisa que los datos esten correctos';
            this.msj.mensajeRecuperacionPassError(this.textoMensajes);
        }
    }

}

// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase FormLoginComponent
@Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
    styleUrls: ['./form-login.component.css']
})

// Export de la clase FormLoginComponent
export class FormLoginComponent implements OnInit {
    // Declaración de variables
    formularioLogin: FormGroup;
    datosCorrectos: boolean = true;
    textoMensajes: string = "";
    userID: string;

    // Constructor de la clase FormLoginComponent
    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        public afAuth: AngularFireAuth,
        private msj: MensajesService,
        private router: Router,
    ) { }

    // Método inicializador de la clase FormLoginComponent
    ngOnInit(): void {
        // Si no existe usuario logueado validación del formulario de Login
        this.formularioLogin = this.fb.group({
            email: ['', Validators.compose([
                Validators.email,
                Validators.required
            ])],
            pass: ['', Validators.required]
        });
        
        // Comprobación si existe usuario logueado
        this.afAuth.onAuthStateChanged((user)=> {
            if (user != null){
                // Si existe usuario logueado redirijo al Home
                this.router.navigateByUrl('');
            // En caso de no haber usuario logueado
            }else {

            }
        })
    }

    // Método para realizar el Login del usuario
    login() {
        // Comprobación si formulario es válido
        if(this.formularioLogin.valid){
            this.datosCorrectos = true;
            this.spinner.show();
            // Hago Login del usuario y redirijo al Home
            this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.pass)
            .then(()=> {
                this.router.navigateByUrl('');
                this.spinner.hide();
                this.formularioLogin.reset();
            // En caso de haber un error al Login del usuario en Firebase
            }).catch((error)=> {
                this.datosCorrectos = false;
                this.textoMensajes = error.message;
                this.spinner.hide();
                this.msj.mensajeLoginError(this.textoMensajes);
                this.formularioLogin.reset();
            });
        // En caso de formulario no válido
        }else{
            this.datosCorrectos = false;
            this.textoMensajes = 'Porfavor, revisa que los datos esten correctos';
            this.msj.mensajeLoginError(this.textoMensajes);
        }
    }

}

// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

// Inyección del tipo Component para la clase FormRegistroComponent
@Component({
    selector: 'app-form-registro',
    templateUrl: './form-registro.component.html',
    styleUrls: ['./form-registro.component.css']
})

// Export de la clase FormRegistroComponent
export class FormRegistroComponent implements OnInit {
    // Declaración de variables
    usuario: Usuario = new Usuario();
    formularioRegistro: FormGroup;
    datosCorrectos: boolean = true;
    textoMensajes: string = "";
    textoMensajes2: string = "";

    // Constructor de la clase FormRegistroComponent
    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        public afAuth: AngularFireAuth,
        private msj: MensajesService,
        private router: Router,
        private db: AngularFirestore,
    ) { }

    // Método inicializador de la clase FormRegistroComponent
    ngOnInit(): void {
        // Validacion del formulario de registro
        this.formularioRegistro = this.fb.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            pass: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.email,
                Validators.required
            ])],
            tlf: ['', Validators.required],
            dni: ['', Validators.required]
        });

        // Si existe usuario logueado redirijo al Home
        if(localStorage.getItem('usuario')){
            this.router.navigateByUrl('/paginaPrincipal');
        }
    }

    // Método para realizar el registro del usuario
    register(){
        // Compruebo si formulario es válido
        if (this.formularioRegistro.valid){
            this.datosCorrectos = true;
            this.spinner.show();
            let usuarioAgregar: Usuario = {
                nombre: this.formularioRegistro.value.nombre,
                apellidos: this.formularioRegistro.value.apellidos,
                pass: this.formularioRegistro.value.pass,
                email: this.formularioRegistro.value.email,
                tlf: this.formularioRegistro.value.tlf,
                dni: this.formularioRegistro.value.dni,
            }
            // Registro usuario con método predefinido de Firebase
            this.afAuth.createUserWithEmailAndPassword(this.formularioRegistro.value.email, this.formularioRegistro.value.pass)
            .then(()=> {
                // Realizo el registro de la información del usuario en la Base de Datos
                this.db.collection('usuarios').add(usuarioAgregar)
                .then(()=> {
                    this.router.navigateByUrl('/formLogin');
                    this.textoMensajes = 'Registro completado correctamente';
                    this.msj.mensajeRegistroCorrecto(this.textoMensajes);
                    this.spinner.hide();
                // En caso de haber un error al conectar la Base de Datos
                }).catch((error)=> {
                    this.datosCorrectos = false;
                    this.textoMensajes2 = error.message;
                    this.formularioRegistro.reset();
                    this.spinner.hide();
                    this.msj.mensajeRegistroError(this.textoMensajes2);
                });
                // Al finalizar limpio el formulario
                this.formularioRegistro.reset();
            // En caso de haber un error al registrar al usuario en Firebase
            }).catch((error)=> {
                this.datosCorrectos = false;
                this.textoMensajes = error.message;
                this.spinner.hide();
                this.msj.mensajeRegistroError(this.textoMensajes + " " + this.textoMensajes2);
                this.formularioRegistro.reset();
            })
        // En caso de formulario no válido
        }else{
            this.datosCorrectos = false;
            this.textoMensajes = 'Porfavor, revisa que los datos esten correctos';
            this.msj.mensajeRegistroError(this.textoMensajes);
        }
    }

}

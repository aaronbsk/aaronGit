import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-form-registro',
    templateUrl: './form-registro.component.html',
    styleUrls: ['./form-registro.component.css']
})
export class FormRegistroComponent implements OnInit {
    usuario: Usuario = new Usuario();
    formularioRegistro: FormGroup;
    datosCorrectos: boolean = true;
    textoMensajes: string = "";
    textoMensajes2: string = "";

    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        public afAuth: AngularFireAuth,
        private msj: MensajesService,
        private router: Router,
        private db: AngularFirestore,
    ) { }

    ngOnInit(): void {
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
    }

    register(){
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
            this.afAuth.createUserWithEmailAndPassword(this.formularioRegistro.value.email, this.formularioRegistro.value.pass)
            .then(()=> {
                this.db.collection('usuarios').add(usuarioAgregar)
                .then(()=> {
                    this.router.navigateByUrl('/formLogin');
                    this.textoMensajes = 'Registro completado correctamente';
                    this.msj.mensajeRegistroCorrecto(this.textoMensajes);
                    this.spinner.hide();
                }).catch((error)=> {
                    this.datosCorrectos = false;
                    this.textoMensajes2 = error.message;
                    this.spinner.hide();
                    this.msj.mensajeRegistroError(this.textoMensajes2);
                })
            }).catch((error)=> {
                this.datosCorrectos = false;
                this.textoMensajes = error.message;
                this.spinner.hide();
                this.msj.mensajeRegistroError(this.textoMensajes + " " + this.textoMensajes2);
            })
        }else{
            this.datosCorrectos = false;
            this.textoMensajes = 'Porfavor, revisa que los datos esten correctos';
            this.msj.mensajeRegistroError(this.textoMensajes);
        }
    }

}

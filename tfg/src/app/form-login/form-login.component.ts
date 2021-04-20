import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from '../models/usuario';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
    styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
    formularioLogin: FormGroup;
    datosCorrectos: boolean = true;
    textoMensajes: string = "";
    userID: string;

    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        public afAuth: AngularFireAuth,
        private msj: MensajesService,
        private router: Router,
        private db: AngularFirestore
    ) { }

    ngOnInit(): void {
        this.formularioLogin = this.fb.group({
            email: ['', Validators.compose([
                Validators.email,
                Validators.required
            ])],
            pass: ['', Validators.required]
        });

        if(localStorage.getItem('usuario')){
            this.router.navigateByUrl('/paginaPrincipal');
        }
    }

    login(){
        if(this.formularioLogin.valid){
            this.datosCorrectos = true;
            this.spinner.show();
            this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.pass)
            .then(()=> {
                this.router.navigateByUrl('/paginaPrincipal');
                this.spinner.hide();
            }).catch((error)=> {
                this.datosCorrectos = false;
                this.textoMensajes = error.message;
                this.spinner.hide();
                this.msj.mensajeLoginError(this.textoMensajes);
            });
        }else{
            this.datosCorrectos = false;
            this.textoMensajes = 'Porfavor, revisa que los datos esten correctos';
            this.msj.mensajeLoginError(this.textoMensajes);
        }
    }

}

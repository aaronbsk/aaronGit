import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from '../services/mensajes.service';

@Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
    styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
    formularioLogin: FormGroup;
    datosCorrectos: boolean = true;
    textoError: string = "";

    constructor(
        private fb: FormBuilder,
        private spinner: NgxSpinnerService,
        public afAuth: AngularFireAuth,
        private msj: MensajesService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.formularioLogin = this.fb.group({
            email: ['', Validators.compose([
                Validators.email,
                Validators.required
            ])],
            pass: ['', Validators.required]
        });
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
                this.textoError = error.message;
                this.spinner.hide();
                this.msj.mensajeLoginError(this.textoError);
            })
        }else{
            this.datosCorrectos = false;
            this.textoError = 'Porfavor, revisa que los datos esten correcto';
            this.msj.mensajeLoginError(this.textoError);
        }
    }

}

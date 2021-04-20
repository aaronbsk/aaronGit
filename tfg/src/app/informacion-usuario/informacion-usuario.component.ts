import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-informacion-usuario',
    templateUrl: './informacion-usuario.component.html',
    styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

}

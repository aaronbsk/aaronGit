import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reservar-mesa',
    templateUrl: './reservar-mesa.component.html',
    styleUrls: ['./reservar-mesa.component.css']
})
export class ReservarMesaComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

}

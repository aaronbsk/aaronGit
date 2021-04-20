import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes.component.html',
    styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    volverAtras(){
        this.router.navigateByUrl('/paginaPrincipal');
    }

}

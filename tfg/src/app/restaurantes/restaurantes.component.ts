// Imports
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { Location } from '@angular/common';

// Inyección del tipo Component para la clase RestaurantesComponent
@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes.component.html',
    styleUrls: ['./restaurantes.component.css']
})

// Export de la clase RestaurantesComponent
export class RestaurantesComponent implements OnInit {
    // Declaración de variables
    restaurantes: Restaurante[] = new Array<Restaurante>();

    // Constructor de la clase RestaurantesComponent
    constructor(
        private router: Router,
        private _location: Location,
        private db: AngularFirestore
    ) { }

    // Método inicializador de la clase RestaurantesComponent
    ngOnInit(): void {
        this.restaurantes.length = 0;
        // Recibo los restaurantes de la Base de Datos
        this.db.collection('restaurantes').get().subscribe((resultado)=> {
            resultado.docs.forEach((item)=> {
                let restaurante: any = item.data();

                this.restaurantes.push(restaurante);
            })
        })
    }

    // Método para volver a la localización previa
    volverAtras(){
        this._location.back();
    }

    // Método para redirigir al usuario al Home
    irAHome(){
        this.router.navigateByUrl('/paginaPrincipal');
    }
}

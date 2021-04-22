import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { Location } from '@angular/common';

@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes.component.html',
    styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
    restaurantes: Restaurante[] = new Array<Restaurante>();

    constructor(
        private router: Router,
        private _location: Location,
        private db: AngularFirestore
    ) { }

    ngOnInit(): void {
        this.restaurantes.length = 0;
        this.db.collection('restaurantes').get().subscribe((resultado)=> {
            resultado.docs.forEach((item)=> {
                let restaurante: any = item.data();

                this.restaurantes.push(restaurante);
            })
        })
    }

    volverAtras(){
        this._location.back();
    }

    irAHome(){
        this.router.navigateByUrl('/paginaPrincipal');
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Restaurante } from '../models/restaurante';

@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes.component.html',
    styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
    restaurantes: Restaurante[] = new Array<Restaurante>();

    constructor(
        private router: Router,
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
        this.router.navigateByUrl('/paginaPrincipal');
    }
}

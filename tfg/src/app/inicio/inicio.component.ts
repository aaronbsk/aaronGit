// Imports
import { Component, OnInit } from '@angular/core';

// Inyección del tipo Component para la clase InicioComponent
@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})

// Export de la clase InicioComponent
export class InicioComponent implements OnInit {

    // Constructor de la clase InicioComponent
    constructor(
    ) { }

    // Método inicializador de la clase InicioComponent
    ngOnInit(): void {
        localStorage.removeItem('usuario');
    }

}

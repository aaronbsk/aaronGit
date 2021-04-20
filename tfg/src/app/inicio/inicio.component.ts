import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('usuario');
    }

}

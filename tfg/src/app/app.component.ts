// Imports
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

// Inyeccion del tipo Component para la clase AppComponent
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

// Export de la clase AppComponent
export class AppComponent {
    title = 'tfg';
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    showHeader: boolean = false;
    showHeaderTitulo: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ){
        router.events.forEach((event)=> {
            if (event instanceof NavigationStart){
                if (event['url'] === '/' || event['url'] === '/home' || event['url'] === '/formLogin' || event['url'] === '/formRegistro'){
                    this.showHeader = false;
                }else {
                    this.showHeader = true;
                }
            }
        });

        router.events.forEach((event)=> {
            if (event instanceof NavigationStart){
                if (event['url'] === '/'){
                    this.showHeaderTitulo = false;
                }else {
                    this.showHeaderTitulo = true;
                }
            }
        });
    }

    ngOnInit(): void {
    }

    logout(){
        this.afAuth.signOut();
        localStorage.removeItem('usuario');
        this.router.navigateByUrl('');
    }
}

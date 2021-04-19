// Imports
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Providers
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Modulos (Componentes)
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InicioComponent,
    FormRegistroComponent,
    FormLoginComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
    // SWEET ALERT INSTALADO PERO SOLO HAY QUE IMPORTARLO EN LA CLASE DONDE LO VAYA A USAR
  ],
  providers: [
    AngularFireAuth,
    AngularFireAuthModule,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

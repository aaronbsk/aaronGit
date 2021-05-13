// Imports
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Providers
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Módulos (Componentes)
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservarMesaComponent } from './reservar-mesa/reservar-mesa.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HistorialReservasComponent } from './historial-reservas/historial-reservas.component';


// Declaración de los modulos
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FormRegistroComponent,
    FormLoginComponent,
    PaginaPrincipalComponent,
    ReservarMesaComponent,
    InformacionUsuarioComponent,
    RestaurantesComponent,
    HistorialReservasComponent
  ],
  // Declaración de los imports
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  // Declaración de los providers
  providers: [
    AngularFireAuth,
    AngularFireAuthModule,
    AngularFirestore
  ],
  // Inyección de bootstrap en toda la aplicación
  bootstrap: [AppComponent]
})

// Export de la clase AppModule
export class AppModule { }

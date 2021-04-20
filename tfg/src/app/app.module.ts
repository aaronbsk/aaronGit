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

// Providers
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Modulos (Componentes)
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ReservarMesaComponent } from './reservar-mesa/reservar-mesa.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    InicioComponent,
    FormRegistroComponent,
    FormLoginComponent,
    PaginaPrincipalComponent,
    ReservarMesaComponent,
    InformacionUsuarioComponent,
    RestaurantesComponent
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
  ],
  providers: [
    AngularFireAuth,
    AngularFireAuthModule,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

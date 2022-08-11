import { TokenInterceptor } from './interceptors/token.interceptos';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { RedDirective } from './directives/red.directive';
import { SistemaModule } from './sistema/sistema.module';
import { InstitucionalModule } from './institucional/institucional.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    RedDirective,  
  ],
  imports: [
    AppRoutingModule,
    SistemaModule,
    InstitucionalModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

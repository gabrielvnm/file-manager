import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Teste1Component } from './teste1/teste1.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { FilesComponent } from './files/files.component';
import { UploadComponent } from './upload/upload.component';
import { ArquivoDetalheComponent } from './arquivo-detalhe/arquivo-detalhe.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    Teste1Component,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    FilesComponent,
    UploadComponent,
    ArquivoDetalheComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

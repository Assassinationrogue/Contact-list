import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { SlideMenuModule } from 'primeng/slidemenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { AddFormComponent } from './components/add-form/add-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContactListComponent,
    AddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    ConfirmPopupModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    SlideMenuModule,
    OverlayPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

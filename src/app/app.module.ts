import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {  ButtonModule } from 'primeng/button';

import { EditFormComponent } from './components/edit-form/edit-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupDirective } from './directives/popup.directive';
import { PopupComponent } from './directives/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContactListComponent,
    EditFormComponent,
    PopupDirective,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

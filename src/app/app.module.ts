import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimaryComponent } from './game/primary/primary.component';
import { SecondaryComponent } from './game/secondary/secondary.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { TertiaryComponent } from './game/tertiary/tertiary.component';
import { GrigliaComponent } from './game/griglia/griglia.component';
import { AddItemDialogComponent } from './dialog/add-item-dialog/add-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryComponent,
    SecondaryComponent,
    TertiaryComponent,
    GrigliaComponent,

    /** DIALOG */
    AddItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatDialogModule,
    MatProgressBarModule,

    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

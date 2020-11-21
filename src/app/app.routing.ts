import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

/** Router Component */
import { PrimaryComponent } from './game/primary/primary.component';
import { SecondaryComponent } from './game/secondary/secondary.component';

const routes: Routes = [
    { path: '', component: AppComponent, pathMatch: 'full' },
    { path: 'primary', component: PrimaryComponent },
    { path: 'secondary', component: SecondaryComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }

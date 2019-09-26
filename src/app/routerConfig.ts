import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

export const route: Routes = [
    {
    path : '', component: HomeComponent, pathMatch: 'full'
    },
    {
    path : 'shows/:id',
    component : ShowDetailsComponent, pathMatch: 'full'
    }
];
